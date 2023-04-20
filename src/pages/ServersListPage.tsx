import { useEffect, useState } from 'react';
import PageWrapper from '../components/PageWrapper';
import { useDataContext } from '../store/DataContext';
// https://d.transporttycoon.eu/main/players.json

const trClass = 'border-collapse text-center bg-red-100';

export default function ServersListPage() {
  const { servers } = useDataContext();

  return (
    <PageWrapper title="Transpoty Tycoon Servers list">
      <table className='w-full text-center'>
        <thead>
          <tr>
            <th className='max-w-[200px]'>Server Name</th>
            <th>Players</th>
            <th>Status</th>
            <th>Uptime</th>
            <th>DXP</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(servers).map((server, index) => {
            const isOnline = server.loaded && !!server.serverData;
            const dxp = server?.['serverData']?.['dxp'];
            const isDxpActive = dxp !== undefined && dxp[0] === true;

            return (
              <tr key={index} className={!server.loaded ? 'cgp-lightgrey' : isOnline ? '' : 'cgp-grey'}>
                <td data-label="Server" className='w-[200px]'>
                  <b>{server.name}</b>
                  <br />
                  {/* <ServerJoinModal server={server} /> */}
                </td>
                <td data-label="Players">
                  <div style={{ minWidth: '60px' }}>
                    {
                      !isOnline
                        ? '-/-'
                        : //   <PlayersListModal
                          // server={server}
                          // linkTitle={
                          (server.playersData!.length <= server.serverData!.limit
                            ? server.playersData!.length
                            : server.serverData!.limit + '+') +
                          '/' +
                          server.serverData!.limit
                      // }
                      //   />
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
                      <>
                        {/* <ServerInfoModal server={server} linkTitle="Online" /> */}
                        online
                      </>
                    ) : (
                      'Offline'
                    )}
                  </div>
                </td>
                <td data-label="Uptime">
                  <div style={{ minWidth: '80px' }}>
                    {isOnline
                      ? server.serverData!.uptime
                      : // <ModalInstance linkTitle={<Uptime time={server.serverData.uptime} />}>
                        //   Servers usually restarts every 18 hours
                        // </ModalInstance>
                        '-'}
                  </div>
                </td>
                <td className="dxp" data-label="DXP">
                  {isOnline && isDxpActive ? (
                    <span style={{ display: 'inline-block', minWidth: '110px' }}>
                      dxp
                      {/* <DXPModal dxp={dxp} server={server} /> */}
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
      <div className="border-start">
        <div className="border-end text-center text-shadow">{/* <SkillBoost /> */}</div>
      </div>
    </PageWrapper>
  );
}
