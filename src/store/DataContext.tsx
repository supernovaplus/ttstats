import { useState, useEffect, createContext } from 'react';
import { useContext } from 'react';
import { fetchAllServers, defaultServersState } from '../controllers/fetchServers';
import { SetServerDispatchType, ServerDataObjectList } from '../types/serverTypes';

const DataContext = createContext<{
  servers: ServerDataObjectList;
  setServers: SetServerDispatchType | Function;
}>({
  servers: defaultServersState,
  setServers: () => {},
});

export function DataContextProvider({ children }: { children: React.ReactNode }) {
  const [servers, setServers] = useState(defaultServersState);

  useEffect(() => {
    fetchAllServers(servers, setServers);
    // eslint-disable-next-line
  }, []);

  return <DataContext.Provider value={{ servers, setServers }}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext);
