import React, { useEffect, useState } from 'react';
import { fetchAllServers, useDataContext } from '../data/store';

export default function RefreshButton() {
	const [state, setState] = useState({ total: 0, players: 0, servers: 0 });
	const { servers, setServers } = useDataContext();

	const handleOnClickRefresh = (e) => {
		e.preventDefault();
		fetchAllServers(servers, setServers);
	};

	useEffect(() => {
		let serversCounter = 0;
		let playersCounter = 0;
		let totalCounter = 0;

		for (const key in servers) {
			totalCounter++;
			if (!servers[key].loaded || !servers[key].serverData) continue;
			serversCounter++;
			if (servers[key].playersData) playersCounter += servers[key].playersData.length;
		}

		setState((s) => ({
			...s,
			total: totalCounter,
			servers: serversCounter,
			players: playersCounter,
		}));
	}, [servers]);

	return (
		<div className='serverCountItem'>
			Servers Loaded: {state.servers}/{state.total} ({state.players} players)
			<a href={window.location.href} onClick={handleOnClickRefresh} className="refresh">
				click to refresh
			</a>
		</div>

		// <input
		//     style={{textAlign:"right"}}
		//     type="button"
		//     value={`Servers Loaded: ${state.servers}/${state.total} | Players Online: ${state.players} | click to refresh`}
		//     className="refresh"
		//     onClick={handleOnClickRefresh}
		// />
	);
}
