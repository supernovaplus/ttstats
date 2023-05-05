import { ServerDataObject } from '../../types/serverTypes';
import { useEffect } from 'react';
import { generateJoinLink } from '../../controllers/misc';

export default function ServerConnectModal({ server }: { server: ServerDataObject }) {
  useEffect(() => {
    window.location.href = generateJoinLink(server);
  }, []);

  return (
    <div className="text-center">
      <div>Joining {server.name}</div>
      <div>
        <span className="max-w-sm">
          Sometimes connecting doesn't work on first try, click the link again below if that happens
        </span>
      </div>
      <div>
        <a href={generateJoinLink(server)} className="my-2 block px-2 py-1 lnk-btn">
          Connect Again
        </a>
      </div>
    </div>
  );
}
