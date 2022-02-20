import { useEffect } from "react";
import {
	// RecoilRoot,
	atom,
	// selector,
	useRecoilState,
	// useRecoilValue,
} from "recoil";

import serversList from "./serverslist.json";

export const serversAtom = atom({
	key: "servers",
	default: serversList.reduce((acc, server, index) => {
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
	}, {}),
});

export const fetchServer = (server, setServer) => {
	// set server loading status
	setServer((s) => ({
		...s,
		[server.endpoint]: {
			...server,
			loaded: false,
		},
	}));

	const cancelController = new AbortController();
	const cancelControllerTimeout = setTimeout(() => {
		cancelController.abort();
	}, 6000);

	fetch(`https://tycoon-${server.endpoint}.users.cfx.re/status/widget/players.json`, {
		signal: cancelController.signal,
		redirect: "error",
	})
		.then((res) => {
			if (res.status === 404) {
				throw new Error("offline");
			} else {
				return res.json();
			}
		})
		.then((res) => {
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

			//if tt api is down use fivem api to fetch the data
		})
		.catch(async () => {
			clearTimeout(cancelControllerTimeout);
			setTimeout(() => {
				cancelController.abort();
			}, 5000);

			fetch(`https://servers-frontend.fivem.net/api/servers/single/${server.endpoint}`, {
				signal: cancelController.signal,
				redirect: "error",
			})
				.then((res) => {
					if (res.status === 404) {
						throw new Error("offline");
					} else {
						return res.json();
					}
				})
				.then((res) => {
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

					//server is offline
				})
				.catch(() => {
					setServer((s) => ({
						...s,
						[server.endpoint]: {
							...server,
							loaded: true,
							error: true,
							lastUpdate: Date.now(),
						},
					}));
				});
		});
};

export const fetchAllServers = (servers, setServers) => {
	for (const key in servers) {
		fetchServer(servers[key], setServers);
	}
};

export const DataStore = ({ children }) => {
	const [servers, setServers] = useRecoilState(serversAtom);

	useEffect(() => {
		fetchAllServers(servers, setServers);
		// eslint-disable-next-line
	}, []);

	return <>{children}</>;
};
