import { useEffect, useContext, createContext, useState } from "react";
import serversList from "./serverslist.json";

const initialServersState = serversList.reduce((acc, server) => {
	acc[server[0]] = {
		name: server[1],
		endpoint: server[0],
		sname: server[2],
		error: null,
		serverData: null,
		playersData: null,
		lastUpdate: null,
		loaded: false,
		// vehicleData: null
	};
	return acc;
}, {});

export const DataContext = createContext({ servers: initialServersState });

const cancellableJSONFetch = async ({ cancelController, url, cancelControllerTimeout }) => {
	cancelControllerTimeout = setTimeout(() => {
		cancelController.abort();
	}, 5000);

	const res = await fetch(url, {
		signal: cancelController.signal,
		redirect: "error",
	});

	if (res.status === 404) {
		throw new Error("offline");
	} else {
		return res.json();
	}
};

const parseStatusJSON = async ({ res, setServer, server }) => {
	if (!("server" in res)) throw new Error("offline");

	for (let i = 0; i < res.players.length; i++) {
		if (res.players[i][5] === "") res.players[i][5] = "Unemployed";
	}

	setServer((s) => ({
		...s,
		[server.endpoint]: {
			...server,
			loaded: true,
			playersData: res.players,
			serverData: res.server,
			lastUpdate: Date.now(),
		},
	}));
};

export const fetchServer = async (server, setServer) => {
	// set server loading status
	setServer((s) => ({
		...s,
		[server.endpoint]: {
			...server,
			loaded: false,
		},
	}));

	const cancelController = new AbortController();
	let cancelControllerTimeout;
	let success = false;

	//fetch fivem reverse proxy
	try {
		const res = await cancellableJSONFetch({ cancelController, cancelControllerTimeout, url: `https://tycoon-${server.endpoint}.users.cfx.re/status/widget/players.json` });
		await parseStatusJSON({ res, setServer, server });
		success = true;
	} catch (err) {}

	//else fetch ttstats reverse proxy
	try {
		clearTimeout(cancelControllerTimeout);
		if (success) return;
		const res = await cancellableJSONFetch({ cancelController, cancelControllerTimeout, url: `https://d.ttstats.eu/status/${server.endpoint}` });
		await parseStatusJSON({ res, setServer, server });
		success = true;
	} catch (err) {}

	//else fetch fivem server status api
	try {
		clearTimeout(cancelControllerTimeout);
		if (success) return;
		const res = await cancellableJSONFetch({ cancelController, cancelControllerTimeout, url: `https://servers-frontend.fivem.net/api/servers/single/${server.endpoint}` });

		if (!("Data" in res)) throw new Error("offline");
		const data = res["Data"];

		setServer((s) => ({
			...s,
			[server.endpoint]: {
				...server,
				loaded: true,
				playersData: data.players.map((player) => [player.name || "?", -1, "?", null, false, "?", false]),
				serverData: {
					limit: data?.["sv_maxclients"] || 32,
					beta: "",
					dxp: [false],
					// "dxp": [true,"FAKENAME",5000,5000,5000],
					uptime: data?.["vars"]?.["Uptime"] || "1m",
					region: "?",
					number: "?",
					name: "",
					motd: "",
				},
				lastUpdate: Date.now(),
			},
		}));

		success = true;
	} catch (err) {}

	//else all fetches failed, set status to offline
	clearTimeout(cancelControllerTimeout);
	if (success) return;
	setServer((s) => ({
		...s,
		[server.endpoint]: {
			...server,
			loaded: true,
			error: true,
			lastUpdate: Date.now(),
		},
	}));
};

export const fetchAllServers = (servers, setServers) => {
	for (const key in servers) {
		fetchServer(servers[key], setServers);
	}
};

export const DataContextProvider = ({ children }) => {
	const [servers, setServers] = useState(initialServersState);

	useEffect(() => {
		fetchAllServers(servers, setServers);
		// eslint-disable-next-line
	}, []);

	return <DataContext.Provider value={{ servers, setServers }}>{children}</DataContext.Provider>;
};

export const useDataContext = () => useContext(DataContext);
