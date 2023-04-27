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
    <button onClick={handleOnClickRefresh} className='hover:text-gray-300'>
      <div className='block md:inline'>Servers Loaded: {state.servers}/{state.total} ({state.players} players)</div><div className='hidden md:inline'> | </div><div className='block md:inline'>click to refresh</div>
    </button>
  );
}
