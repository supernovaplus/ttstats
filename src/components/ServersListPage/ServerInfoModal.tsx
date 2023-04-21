import { ServerDataObject } from '../../types/serverTypes';

export default function ServerInfoModal({ server }: { server: ServerDataObject }) {
  const currentPlayerCount = server.playersData ? server.playersData.length : 0;
  const playerCountLimit = server.serverData ? server.serverData.limit : 0;

  return (
    <div className="">
      <div className="">Server Info</div>
      <div className="">
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
          <>
            <div>Server Is Offline</div>
          </>
        )}
        <div>
          <a href={`fivem://connect/${server.endpoint}?pure_1`} className="">
            Connect to the server
          </a>
        </div>
      </div>
    </div>
  );
}
