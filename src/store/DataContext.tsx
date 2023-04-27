import { useState, useEffect, createContext, ReactNode, useContext } from 'react';
import { fetchAllServers, defaultServersState } from '../controllers/fetchServers';
import { SetServerDispatchType, ServerDataObjectList } from '../types/serverTypes';

const DataContext = createContext<{
  servers: ServerDataObjectList;
  setServers: SetServerDispatchType;
}>({
  servers: defaultServersState,
  setServers: () => {},
});

export function DataContextProvider({ children }: { children: ReactNode }) {
  const [servers, setServers] = useState(defaultServersState);

  useEffect(() => {
    fetchAllServers(servers, setServers);
  }, []);

  return <DataContext.Provider value={{ servers, setServers }}>{children}</DataContext.Provider>;
}

export const useDataContext = () => useContext(DataContext);
