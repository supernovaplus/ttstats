import { ServerDataObject } from '../../types/serverTypes';
import { useEffect } from 'react';

export default function ServerConnectModal({ server }: { server: ServerDataObject }) {
  useEffect(() => {
    window.location.href = `fivem://connect/${server.endpoint}?pure_1`;
  }, []);

  return (
    <div className="text-center">
      <div className="">Joining {server.name}</div>
      <div className="">
        Sometimes connecting doesnt work on first try, click the link again below if that happens
      </div>
      <div>
        <a href={`fivem://connect/${server.endpoint}?pure_1`} className="my-2 block p-2 bg-black text-white rounded">
          Connect again
        </a>
      </div>
    </div>
  );
}