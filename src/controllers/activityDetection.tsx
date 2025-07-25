import { useEffect, useRef, useState } from 'react';
import { useDataContext } from '../store/DataContext';
import { ServerDataObjectList, SetServerDispatchType } from '../types/serverTypes';
import { fetchAllServers } from '../controllers/fetchServers';

const detectVisibility =
  (ref: React.MutableRefObject<number>, servers: ServerDataObjectList, setServers: SetServerDispatchType) =>
  () => {
    //when tab is active
    if (!document.hidden) {
      // if last active was over 5 minutes refresh all servers
      if (ref.current && Date.now() - ref.current > 5 * 60 * 1000) {
        fetchAllServers(servers, setServers);
      }
      //set new last active time
      ref.current = Date.now();
    }
  };

export function ActivityDetection() {
  const { servers, setServers } = useDataContext();
  const ref = useRef(Date.now());

  useEffect(() => {
    const detector = detectVisibility(ref, servers, setServers);
    document.addEventListener('visibilitychange', detector);

    return () => {
      document.removeEventListener('visibilitychange', detector);
    };
  }, []);

  return <></>;
}
