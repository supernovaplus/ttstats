import ContentBlock from '../components/ContentBlock';
import { useDataContext } from '../store/DataContext';
import Modal from '../components/Modal';
import ServerConnectModal from '../components/ServersListPageComponents/ServerConnectModal';
import PlayersListModal from '../components/ServersListPageComponents/PlayersListModal';
// import ServerInfoModal from '../components/ServersListPageComponents/ServerInfoModal';
import DXPClock from '../components/ServersListPageComponents/DXPClock';
import DXPModal from '../components/ServersListPageComponents/DXPModal';
import Uptime from '../components/ServersListPageComponents/Uptime';
import Skillboost from '../components/ServersListPageComponents/Skillboost';

export default function ServersListPage() {
  const { servers } = useDataContext();

  return (
    <>
      <ContentBlock title="Transport Tycoon Servers List">
        <table className="w-full text-center dyntable mb-40">
          <thead>
            <tr className="text-lg">
              <th>Server</th>
              <th>Players</th>
              <th>Status</th>
              <th>Uptime</th>
              <th>DXP</th>
            </tr>
          </thead>
          {Object.values(servers).map((server, index) => {
            const isOnline = server.loaded && !!server.serverData;
            const dxp = server?.['serverData']?.['dxp'];
            const isDxpActive = dxp !== undefined && dxp[0] === true;

            return (
              <tbody key={index}>
                <tr className="undyntable">
                  <td colSpan={5}>
                    <div className="mt-1 text-left block pt-2">{server.name}</div>
                  </td>
                </tr>
                <tr
                  className={
                    (!server.loaded ? 'text-gray-400' : isOnline ? '' : 'text-white') +
                    ' md:hover:bg-kebab-dk'
                  }>
                  <td data-label="Server" className="md:w-1/5">
                    <Modal buttonValue="Connect" buttonProps={{ className: 'lnk-btn w-full m-0' }}>
                      <ServerConnectModal server={server} />
                    </Modal>
                  </td>
                  <td data-label="Players" className="md:w-1/5">
                    {
                      !isOnline || !server.playersData ? (
                        '-/-'
                      ) : (
                        <Modal
                          title={`Players on ${server.name}`}
                          buttonValue={
                            (server.playersData!.length <= server.serverData!.limit
                              ? server.playersData!.length
                              : server.serverData!.limit + '+') +
                            '/' +
                            server.serverData!.limit
                          }
                          buttonProps={{ className: 'lnk-btn w-full' }}>
                          <PlayersListModal server={server} />
                        </Modal>
                      )
                      // <Link to={`/playerfinder?server=${encodeURI(server.name)}`} className="btn" title="Server Info">
                      // 	{server.playersData.length <= server.serverData.limit ? server.playersData.length : server.serverData.limit + "+"}/{server.serverData.limit}
                      // </Link>
                    }
                  </td>
                  <td data-label="Status" className="md:w-1/5">
                    {!server.loaded
                      ? 'Loading'
                      : isOnline
                      ? 'Online'
                      : // <Modal
                        //   buttonValue={<span>Online</span>}
                        //   buttonProps={{ className: 'lnk-btn w-full' }}
                        //   title="Server Info">
                        //   <ServerInfoModal server={server} />
                        // </Modal>
                        'Offline'}
                  </td>
                  <td data-label="Uptime" className="md:w-1/5">
                    {isOnline && server.serverData ? (
                      <Modal
                        buttonValue={<Uptime time={server.serverData!.uptime} />}
                        buttonProps={{ className: 'lnk-btn w-full' }}>
                        <div className="text-center">
                          <div>Servers usually restarts every 18 hours</div>
                          <div>
                            <a
                              href={`https://uptime.ttstats.eu/report/uptime/${server.uptimeid}/`}
                              target="_blank"
                              referrerPolicy="no-referrer"
                              className="my-2 block px-2 py-1 lnk-btn">
                              Click here for {server.name} downtime stats
                            </a>
                          </div>
                        </div>
                      </Modal>
                    ) : (
                      '-'
                    )}
                  </td>
                  <td data-label="DXP" className="md:w-1/5">
                    {isOnline && isDxpActive ? (
                      <Modal
                        title="DXP INFO"
                        buttonValue={<DXPClock dxp={server.serverData?.dxp} timestamp={server.lastUpdated} />}
                        buttonProps={{ className: 'lnk-btn w-full' }}>
                        <DXPModal server={server} />
                      </Modal>
                    ) : (
                      <div className="w-full block">No DXP</div>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </ContentBlock>
      <ContentBlock title={<Skillboost />} />
    </>
  );
}
