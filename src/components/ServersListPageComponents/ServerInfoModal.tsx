import { ServerDataObject } from '../../types/serverTypes';
import { generateJoinLink } from '../../controllers/misc';

export default function ServerInfoModal({ server }: { server: ServerDataObject }) {
  const currentPlayerCount = server.playersData ? server.playersData.length : 0;
  const playerCountLimit = server.serverData ? server.serverData.limit : 0;

  return (
    <div className="text-center bg-kebab-even py-2">
      <div className="flex flex-col items-center">
        <div>Name: {server.name}</div>
        {server.serverData ? (
          <>
            <div>Server Is Online</div>
            <div>Uptime: {server.serverData.uptime}</div>
            <div>
              Players Online:{' '}
              {currentPlayerCount <= playerCountLimit
                ? currentPlayerCount
                : playerCountLimit + ` (+${currentPlayerCount - playerCountLimit} in queue)`}
            </div>
            <div>Max Players Allowed: {playerCountLimit}</div>
          </>
        ) : (
          <div>Server Is Offline</div>
        )}
        <div>
          <a href={generateJoinLink(server)} className="my-2 block px-2 py-1 text-white bg-kebab-btn">
            Connect To The Server
          </a>
        </div>
      </div>
    </div>
  );
}
