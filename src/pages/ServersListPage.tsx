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
import PopUnder from '../components/PopUnder';

export default function ServersListPage() {
  const { servers } = useDataContext();

  return (
    <>
      <ContentBlock title="Transport Tycoon Servers List">
        <table className="w-full text-center dyntable mb-60">
          <thead className="bg-nova-opa1">
            <tr className="text-lg sm:flex sm:flex-wrap">
              <th className="w-1/5 sm:w-1/2">Server</th>
              <th className="w-1/5 sm:w-1/2">Players</th>
              <th className="w-1/5 sm:w-1/2">Status</th>
              <th className="w-1/5 sm:w-1/2">Uptime</th>
              <th className="w-1/5 sm:w-1/2">DXP</th>
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
              if (server.sname === 'EVENT') {
                if (!server.playersData || server.playersData.length < 5) {
                  trClass += 'text-gray-400 dark:text-gray-500';
                } else {
                  trClass += 'text-red-900 dark:text-yellow-500';
                }
              } else if (server.sname === 'LITE') {
                trClass += 'text-gray-600 dark:text-gray-300';
              } else {
                trClass += 'text-black dark:text-white';
              }
            } else {
              trClass += 'text-gray-500';
            }

            return (
              <tbody key={index} className={`sm:border-opacity-20 sm:border-2 sm:border-dashed border-black ${trClass}`}>
                <tr className="undyntable">
                  <td colSpan={5}>
                    <div className="mt-1 text-left block pt-2">Server {server.name}
                      {server.info &&
                        <PopUnder>
                          {server.info}
                          {server.links && <div>{server.links.map(([name, link], index) => <a key={index} href={link} target='_blank' className='text-blue-800 dark:text-blue-300 underline'>{name}</a>)}</div>}
                        </PopUnder>}
                      {/* {server.info && 
                        <Modal
                          title={`info`}
                          buttonValue={"i"}
                          buttonProps={{ className: 'text-red ml-1 bg-red-900 w-[25px] rounded' }}>
                        </Modal>} */}
                    </div>
                  </td>
                </tr>
                <tr className={`dark:border-b-black sm:flex sm:flex-wrap ${trClass}`}>
                  <td data-label="Server" className="w-1/5 sm:w-1/2">
                    <Modal
                      title={`Joining ${server.name} server`}
                      buttonValue="Connect"
                      buttonProps={{ className: 'lnk-btn w-full m-0' }}>
                      <ServerConnectModal server={server} />
                    </Modal>
                  </td>
                  <td data-label="Players" className="w-1/5 sm:w-1/2">
                    {!isOnline || !server.playersData ? (
                      '-/-'
                    ) : (
                      <Modal
                        title={`Players on ${server.name} server`}
                        buttonValue={
                          (server.playersData!.length <= server.serverData!.limit
                            ? server.playersData!.length
                            : server.serverData!.limit + '+') +
                          '/' +
                          server.serverData!.limit
                        }
                        buttonProps={{ className: 'lnk-btn w-full m-0' }}>
                        <PlayersListModal server={server} />
                      </Modal>
                    )}
                  </td>
                  <td data-label="Status" className="w-1/5 sm:w-1/2">
                    {!server.loaded ? 'Loading' : isOnline ? 'Online' : 'Offline'}
                  </td>
                  <td data-label="Uptime" className="w-1/5 sm:w-1/2">
                    {isOnline && server.serverData ? (
                      server.apiname ? (
                        <Modal
                          title={`${server.name} server`}
                          buttonValue={
                            !server.apiname ? (
                              server.serverData!.uptime
                            ) : (
                              <Uptime time={server.serverData!.uptime} />
                            )
                          }
                          buttonProps={{ className: 'lnk-btn w-full m-0' }}>
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
                  <td data-label="DXP" className="w-1/5 sm:w-1/2">
                    {isOnline ? (
                      isDxpActive ? (
                        <Modal
                          title="DXP Info"
                          buttonValue={
                            <DXPClock dxp={server.serverData?.dxp} timestamp={server.lastUpdated} />
                          }
                          buttonProps={{ className: 'lnk-btn w-full' }}>
                          <DXPModal server={server} />
                        </Modal>
                      ) : (
                        <div className="w-full block">{server.apiname ? 'No DXP' : ''}</div>
                      )
                    ) : (
                      <div className="w-full block">-</div>
                    )}
                  </td>
                </tr>
              </tbody>
            );
          })}
        </table>
        <Skillboost />
      </ContentBlock>
    </>
  );
}
