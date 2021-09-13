import ModalInstance from "./Modal";

export default function ServerInfoModal({linkTitle, server}) {
	const currentPlayerCount = server.playersData ? server.playersData.length : 0;
	const playerCountLimit = server.serverData ? server.serverData.limit : 0;

	return (
		<ModalInstance linkTitle={linkTitle}>
			<div className="border-start">
				<div className="border-title">Server Info</div>
				<div className="border-end">
					Name: {server.name}<br/>
					{server.serverData ? 
						<>
							Server Is Online<br/>
							Uptime: {server.serverData.uptime}<br/>
							Players Online: {currentPlayerCount <= playerCountLimit ? currentPlayerCount : playerCountLimit + ` (+${currentPlayerCount-playerCountLimit} in queue)`}<br/>
							Max Players Allowed: {playerCountLimit}
						</> : <>Server Is Offline</>
					}<br/>
					<a href={"fivem://connect/cfx.re/join/" + server.endpoint} className="normalLink">Connect to the server</a>
				</div>
			</div>
		</ModalInstance>
	)
}