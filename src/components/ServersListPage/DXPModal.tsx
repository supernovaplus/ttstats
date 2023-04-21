import { ServerDataObject } from '../../types/serverTypes';
import DXPClock from './DXPClock';

export default function DXPModal({ server }: { server: ServerDataObject }) {
  return (
    <div className="">
      <div className="">DXP Info</div>
      <div className="">
        <h2>
          {server?.serverData?.dxp?.[0] === true ? (
            <>
              Time left: <DXPClock dxp={server.serverData?.dxp} timestamp={server.lastUpdated} />
              <br />
              Sponsored by: {server.serverData?.dxp?.[1]}
              <br />
              {/* Next DXP time: {server.serverData?.dxp?.[3] ? Number(Number(server.serverData?.dxp?.[3]/1000/60).toFixed(2)) + " minutes" : "-"}<br/> */}
              Started:{' '}
              {server.serverData?.dxp?.[4]
                ? Math.floor(server.serverData?.dxp?.[4] / 1000 / 60) + ' minutes ago'
                : '-'}
              <br />
              {/* {server.lastUpdate - server.serverData?.dxp?.[4]/1000/60} */}
              {/* <DxpClock dxp={[0, 0, 0, 0]} timestamp={Date.now() - 1000}/> */}
            </>
          ) : (
            <>No DXP</>
          )}
        </h2>
      </div>
    </div>
  );
}
