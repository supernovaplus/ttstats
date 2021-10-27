import ModalInstance from "./Modal";

export default function ServerInfoModal({linkTitle, server}) {
	const currentPlayerCount = server.playersData ? server.playersData.length : 0;
	const playerCountLimit = server.serverData ? server.serverData.limit : 0;

	return (
		<ModalInstance linkTitle={linkTitle}>
			<div className="border-start">
				<div className="border-title">Server Info</div>
				<div className="border-end">
					<div>Name: {server.name}</div>
					{server.serverData ? 
						<>
							<div>Server Is Online</div>
							<div>Uptime: {server.serverData.uptime}</div>
							<div>Players Online: {currentPlayerCount <= playerCountLimit ? currentPlayerCount : playerCountLimit + ` (+${currentPlayerCount-playerCountLimit} in queue)`}</div>
							<div>Max Players Allowed: {playerCountLimit}</div>
						</> : <><div>Server Is Offline</div></>
					}
					<div><a href={"fivem://connect/cfx.re/join/" + server.endpoint} className="normalLink">Connect to the server</a></div>
				</div>
			</div>
		</ModalInstance>
	)
}