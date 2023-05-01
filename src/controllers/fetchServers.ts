import { serversList } from '../data/serversList';
import {
  ServerDataObject,
  ServerDataObjectList,
  MainAPIPlayersResponse,
  ServerFallbackAPIResponse,
  SetServerDispatchType,
} from '../types/serverTypes';

export const defaultServersState = serversList.reduce((acc: ServerDataObjectList, server, index) => {
  acc[server.endpoint] = {
    ...server,
    error: false,
    serverData: null,
    playersData: null,
    lastUpdated: null,
    loaded: false,
    // vehicleData: null
  };

  return acc;
}, {});

const cancellableJSONFetch = async ({
  cancelController,
  url,
  cancelControllerTimeout,
}: {
  cancelController: AbortController;
  url: string;
  cancelControllerTimeout?: NodeJS.Timeout;
}) => {
  cancelControllerTimeout = setTimeout(() => {
    cancelController.abort();
  }, 5000);

  const res = await fetch(url, {
    signal: cancelController.signal,
    redirect: 'error',
  });

  if (res.status === 404) {
    throw new Error('offline');
  } else {
    return res.json();
  }
};

const parseStatusJSON = async ({
  res,
  setServer,
  server,
}: {
  res: MainAPIPlayersResponse;
  setServer: SetServerDispatchType;
  server: ServerDataObject;
}) => {
  if (!('server' in res)) throw new Error('offline');

  for (let i = 0; i < res.players!.length; i++) {
    if (res.players![i][5] === '') res.players![i][5] = 'Unemployed';
  }

  setServer((s) => ({
    ...s,
    [server.endpoint]: {
      ...server,
      loaded: true,
      playersData: res.players,
      serverData: res.server,
      // serverData: { ...res.server, dxp: [true, 'FAKENAME', 5000, 5000, 5000] }, // for debug
      lastUpdated: Date.now(),
      error: false,
    },
  }));
};

export const fetchServer = async (server: ServerDataObject, setServer: SetServerDispatchType) => {
  // set server loading status when refreshing
  setServer((s) => ({
    ...s,
    [server.endpoint]: {
      ...server,
      loaded: false,
      error: false,
    },
  }));

  const cancelController = new AbortController();
  let cancelControllerTimeout;
  let success = false;

  //fetch fivem reverse proxy
  try {
    const res: MainAPIPlayersResponse = await cancellableJSONFetch({
      cancelController,
      cancelControllerTimeout,
      url: `https://tycoon-${server.endpoint}.users.cfx.re/status/widget/players.json`,
    });
    await parseStatusJSON({ res, setServer, server });
    success = true;
  } catch (err) {}

  //else fetch ttstats reverse proxy
  try {
    clearTimeout(cancelControllerTimeout);
    if (success) return;
    const res = await cancellableJSONFetch({
      cancelController,
      cancelControllerTimeout,
      url: `https://d.ttstats.eu/status/${server.endpoint}`,
    });
    await parseStatusJSON({ res, setServer, server });
    success = true;
  } catch (err) {}

  //else fetch fivem server status api
  try {
    clearTimeout(cancelControllerTimeout);
    if (success) return;
    const res: ServerFallbackAPIResponse = await cancellableJSONFetch({
      cancelController,
      cancelControllerTimeout,
      url: `https://servers-frontend.fivem.net/api/servers/single/${server.endpoint}`,
    });

    if (!('Data' in res)) throw new Error('offline');
    const data = res['Data'];

    setServer((s) => ({
      ...s,
      [server.endpoint]: {
        ...server,
        loaded: true,
        error: false,
        // playersData: data.players.map((player) => [player.name || '?', -1, '?', null, false, '?', false]),
        serverData: {
          limit: data?.['sv_maxclients'] || 32,
          beta: '',
          dxp: [false],
          // "dxp": [true,"FAKENAME",5000,5000,5000], // for debug
          uptime: data?.['vars']?.['Uptime'] || '1m',
          region: '?',
          number: '?',
          name: '',
          motd: '',
        },
        lastUpdated: Date.now(),
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
      lastUpdated: Date.now(),
    },
  }));
};
``;
export const fetchAllServers = (servers: ServerDataObjectList, setServers: SetServerDispatchType) => {
  for (const key in servers) {
    fetchServer(servers[key], setServers);
  }
};
