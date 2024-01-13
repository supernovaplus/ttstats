/* eslint-disable no-empty */
import { serversList } from '../data/serversList';
import {
  ServerDataObject,
  ServerDataObjectList,
  MainAPIPlayersResponse,
  ServerFallbackAPIResponse,
  SetServerDispatchType,
} from '../types/serverTypes';

export const defaultServersState = serversList.reduce((acc: ServerDataObjectList, server) => {
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

/**
 * Fetch with a timeout using abort controller
 * @param url API URL
 * @param abortAfter Abort after X miliseconds
 * @returns
 */
const cFetch = async (url: string, abortAfter = 5000) => {
  const abortController = new AbortController();
  const timeout = setTimeout(() => {
    abortController.abort();
  }, abortAfter);

  const res = await fetch(url, {
    signal: abortController.signal,
    redirect: 'error',
  });

  clearTimeout(timeout);

  if (res.status !== 200) {
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

  let success = false;

  if (server.apiname) {
    //main reverse proxy api
    try {
      const res: MainAPIPlayersResponse = await cFetch(
        `https://tycoon-${server.endpoint}.users.cfx.re/status/widget/players.json`
      );
      await parseStatusJSON({ res, setServer, server });
      success = true;
    } catch (err) {}

    //else if fails, try ttstats reverse proxy api
    try {
      if (success) return;
      const res: MainAPIPlayersResponse = await cFetch(
        `https://d.ttstats.eu/${server.apiname}/status/widget/players.json`
      );
      await parseStatusJSON({ res, setServer, server });
      success = true;
    } catch (err) {}
  }

  //else fetch fivem server status api
  try {
    if (success) return;
    const res: ServerFallbackAPIResponse = await cFetch(
      `https://servers-frontend.fivem.net/api/servers/single/${server.endpoint}`
    );

    if (!('Data' in res)) throw new Error('offline');
    const data = res['Data'];

    setServer((s) => ({
      ...s,
      [server.endpoint]: {
        ...server,
        // name: (server.endpoint === '2epova' && data?.['hostname']?.replace('^1', '')) || server.name,
        name: server.name,
        loaded: true,
        error: false,
        playersData: data.players.map((player) => [player.name || '?', -1, 0, '', false, '?', false]),
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
