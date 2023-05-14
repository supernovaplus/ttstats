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
          <thead className="bg-nova-opa1">
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

            let trClass = '';
            if (!server.loaded) {
              trClass += 'text-gray-400';
            } else if (isOnline) {
              //color gray if event server has low amount people
              if (!server.apiname && (!server.playersData || server.playersData.length < 5)) {
                trClass += 'text-gray-400 dark:text-gray-500';
              } else {
                trClass += 'text-black dark:text-white';
              }
            } else {
              trClass += 'text-gray-500';
            }

            return (
              <tbody key={index} className={trClass}>
                <tr className="undyntable">
                  <td colSpan={5}>
                    <div className="mt-1 text-left block pt-2">{server.name}</div>
                  </td>
                </tr>
                <tr className={`dark:border-b-black ${trClass}`}>
                  <td data-label="Server" className="w-1/5">
                    <Modal
                      buttonValue="Connect"
                      buttonProps={{ className: 'lnk-btn w-full m-0 text-black dark:text-white' }}>
                      <ServerConnectModal server={server} />
                    </Modal>
                  </td>
                  <td data-label="Players" className="w-1/5">
                    {!isOnline || !server.playersData ? (
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
                        buttonProps={{ className: 'lnk-btn w-full m-0 text-black dark:text-white' }}>
                        <PlayersListModal server={server} />
                      </Modal>
                    )}
                  </td>
                  <td data-label="Status" className="w-1/5">
                    {!server.loaded ? 'Loading' : isOnline ? 'Online' : 'Offline'}
                  </td>
                  <td data-label="Uptime" className="w-1/5">
                    {isOnline && server.serverData ? (
                      server.apiname ? (
                        <Modal
                          title={server.name}
                          buttonValue={
                            !server.apiname ? (
                              server.serverData!.uptime
                            ) : (
                              <Uptime time={server.serverData!.uptime} />
                            )
                          }
                          buttonProps={{ className: 'lnk-btn w-full m-0 text-black dark:text-white' }}>
                          <div className="text-center">
                            <div>Servers usually restarts every 18 hours</div>
                            {server.uptimeid && (
                              <div>
                                <a
                                  href={`https://uptime.ttstats.eu/report/uptime/${server.uptimeid}/`}
                                  target="_blank"
                                  referrerPolicy="no-referrer"
                                  className="my-2 block px-2 py-1 lnk-btn bg-nova-c1 text-white dark:bg-nova-c3">
                                  Click here for {server.name} downtime stats
                                </a>
                              </div>
                            )}
                          </div>
                        </Modal>
                      ) : (
                        server.serverData!.uptime
                      )
                    ) : (
                      '-'
                    )}
                  </td>
                  <td data-label="DXP" className="w-1/5">
                    {isOnline && isDxpActive ? (
                      <Modal
                        title="DXP Info"
                        buttonValue={<DXPClock dxp={server.serverData?.dxp} timestamp={server.lastUpdated} />}
                        buttonProps={{ className: 'lnk-btn w-full' }}>
                        <DXPModal server={server} />
                      </Modal>
                    ) : (
                      <div className="w-full block">{server.apiname ? 'No DXP' : 'No Info'}</div>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
      </ContentBlock>
      <ContentBlock>
        <Skillboost />
      </ContentBlock>
    </>
  );
}
