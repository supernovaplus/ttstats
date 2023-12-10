/* eslint-disable react-hooks/exhaustive-deps */
import { ServerDataObject } from '../../types/serverTypes';
import { useEffect } from 'react';
import { generateJoinLink } from '../../controllers/misc';

export default function ServerConnectModal({ server }: { server: ServerDataObject }) {
  const handleSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.select();
  };

  useEffect(() => {
    // window.location.href = server.serverip ? generateJoinLink(server, false) : generateJoinLink(server);
    window.location.href = generateJoinLink(server);
  }, []);

  return (
    <div className="text-center flex flex-col">
      <div>Sometimes connecting doesn't work on first try</div>
      <div>click the link again if that happens</div>
      <div>
        <a
          href={generateJoinLink(server)}
          className="my-2 block px-2 py-1 lnk-btn bg-nova-c1 text-white dark:bg-nova-c3">
          Connect Again
        </a>
      </div>
      {server.serverip && (
        <div>
          <a
            href={generateJoinLink(server, false)}
            className="my-2 block px-2 py-1 lnk-btn bg-nova-c1 text-white dark:bg-nova-c3">
            Connect Again Using IP
          </a>
        </div>
      )}
      <div>or open the game, press F8, copy the text below then click ENTER</div>
      <div>
        <input
          type="text"
          className="bg-black text-white rounded w-full resize-none text-center"
          defaultValue={`connect ${server.endpoint}`}
          readOnly
          onSelect={handleSelect}></input>
      </div>

      {server.serverip && (
        <>
          <div>or</div>
          <div>
            <input
              type="text"
              className="bg-black text-white rounded w-full resize-none text-center"
              defaultValue={`connect ${server.serverip}`}
              readOnly
              onSelect={handleSelect}></input>
          </div>
        </>
      )}
    </div>
  );
}
