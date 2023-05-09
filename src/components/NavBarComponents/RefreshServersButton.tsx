import React, { useEffect, useState } from 'react';
import { useDataContext } from '../../store/DataContext';
import { fetchAllServers } from '../../controllers/fetchServers';

export default function RefreshServersButton() {
  const [state, setState] = useState({ total: 0, players: 0, servers: 0 });
  const { servers, setServers } = useDataContext();

  const handleOnClickRefresh = () => {
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
      if (servers[key].playersData) playersCounter += (servers[key].playersData || []).length;
    }

    setState({
      total: totalCounter,
      servers: serversCounter,
      players: playersCounter,
    });
  }, [servers]);

  return (
    <button onClick={handleOnClickRefresh} className="hover:text-gray-300 text-shadow-2">
      <span className="sm:block">
        Servers Loaded: {state.servers}/{state.total} ({state.players} players)
      </span>
      <span className="sm:hidden"> | </span>
      <span>click to refresh</span>
    </button>
  );
}
