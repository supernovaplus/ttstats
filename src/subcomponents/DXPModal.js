import ModalInstance from "./Modal";
import DxpClock from "./DxpClock";

export default function DXPModal({linkTitle, server}) {

	return (
		<ModalInstance linkTitle={<DxpClock dxp={server.serverData?.dxp} timestamp={server.lastUpdate}/>}>
            <div className="border-start">
                <div className="border-title">DXP Info</div>
                <div className="border-end">
                    <h2>
                        {server?.serverData?.dxp?.[0] === true ? 
                            <>
                                Time left: <DxpClock dxp={server.serverData?.dxp} timestamp={server.lastUpdate}/><br/>
                                Sponsored by: {server.serverData?.dxp?.[1]}<br/>
                                Next DXP time: {server.serverData?.dxp?.[3] ? Number(Number(server.serverData?.dxp?.[3]/1000/60).toFixed(2)) + " minutes" : "-"}<br/>
                                Started: {server.serverData?.dxp?.[4] ? Math.floor(server.serverData?.dxp?.[4]/1000/60) + " minutes ago" : "-"}
                            </>: 
                            <>No DXP</>}
                    </h2>
                </div>
            </div>
		</ModalInstance>
	)
}