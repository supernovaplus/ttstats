import ContentBlock from '../components/ContentBlock';
import { useDataContext } from '../store/DataContext';
import Modal from '../components/Modal';
import ServerConnectModal from '../components/ServersListPage/ServerConnectModal';
import PlayersListModal from '../components/ServersListPage/PlayersListModal';
import ServerInfoModal from '../components/ServersListPage/ServerInfoModal';
import DXPClock from '../components/ServersListPage/DXPClock';
import DXPModal from '../components/ServersListPage/DXPModal';
import Uptime from '../components/ServersListPage/Uptime';

export default function ServersListPage() {
  const { servers } = useDataContext();

  return (
    <ContentBlock title="Transport Tycoon Servers List">
      <table className="w-full text-center dyntable text-shadow-1">
        <thead>
          <tr>
            <th>Server Name</th>
            <th>Players</th>
            <th>Status</th>
            <th>Uptime</th>
            <th className="min-w-[100px]">DXP</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(servers).map((server, index) => {
            const isOnline = server.loaded && !!server.serverData;
            const dxp = server?.['serverData']?.['dxp'];
            const isDxpActive = dxp !== undefined && dxp[0] === true;

            return (
              <tr key={index} className={!server.loaded ? 'text-yellow-200' : isOnline ? '' : 'text-white'}>
                <td data-label="Server">
                  <b>{server.name}</b>
                  <div>
                    <Modal
                      buttonValue={
                        <div className="inline text-shadow-1 margin-0 hover:text-gray-300">Connect</div>
                      }>
                      <ServerConnectModal server={server} />
                    </Modal>
                  </div>
                </td>
                <td data-label="Players">
                  <div
                    style={{ minWidth: '60px' }}
                    className="inline text-shadow-1 margin-0 hover:text-gray-300">
                    {
                      !isOnline ? (
                        '-/-'
                      ) : (
                        <Modal
                          buttonValue={
                            (server.playersData!.length <= server.serverData!.limit
                              ? server.playersData!.length
                              : server.serverData!.limit + '+') +
                            '/' +
                            server.serverData!.limit
                          }>
                          <PlayersListModal server={server} />
                        </Modal>
                      )
                      // <Link to={`/playerfinder?server=${encodeURI(server.name)}`} className="btn" title="Server Info">
                      // 	{server.playersData.length <= server.serverData.limit ? server.playersData.length : server.serverData.limit + "+"}/{server.serverData.limit}
                      // </Link>
                    }
                  </div>
                </td>
                <td data-label="Status">
                  <div style={{ minWidth: '66px' }}>
                    {!server.loaded ? (
                      'Loading'
                    ) : isOnline ? (
                      <Modal buttonValue={<span>Online</span>}>
                        <ServerInfoModal server={server} />
                      </Modal>
                    ) : (
                      'Offline'
                    )}
                  </div>
                </td>
                <td data-label="Uptime">
                  <div style={{ minWidth: '80px' }}>
                    {isOnline && server.serverData ? (
                      <Modal buttonValue={<Uptime time={server.serverData!.uptime} />}>
                        <span>Servers usually restarts every 18 hours</span>
                      </Modal>
                    ) : (
                      '-'
                    )}
                  </div>
                </td>
                <td className="" data-label="DXP">
                  {isOnline && isDxpActive ? (
                    <span style={{ display: 'inline-block', minWidth: '110px' }}>
                      <Modal
                        buttonValue={
                          <DXPClock dxp={server.serverData?.dxp} timestamp={server.lastUpdated} />
                        }>
                        <DXPModal server={server} />
                      </Modal>
                    </span>
                  ) : (
                    <>-</>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {/* <div className="border-start">
        <div className="border-end text-center text-shadow"><SkillBoost /></div>
      </div> */}
    </ContentBlock>
  );
}
