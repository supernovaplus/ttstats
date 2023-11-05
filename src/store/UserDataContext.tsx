import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { serversList } from '../data/serversList';
import { ServerListRawInterface } from '../types/serverTypes';
import config from '../data/config';

interface UserDataContextInterface {
  servers: {
    server: ServerListRawInterface;
    apikey: string;
  }[];
}

const initialUserDataState = {
  servers: serversList
    .filter((server) => server.apiKeyAllow)
    .map((server) => ({
      server,
      apikey: localStorage.getItem(config.LOCALSTORAGEKEY + server.endpoint + '.apikey') || '',
      charges: localStorage.getItem(config.LOCALSTORAGEKEY + server.endpoint + '.charges') || '',
      lastChecked: Number(localStorage.getItem(config.LOCALSTORAGEKEY + server.endpoint + '.chargesDate')) || '',
    })),
};

const UserDataContext = createContext<{
  userDataState: UserDataContextInterface;
  setUserDataState: React.Dispatch<React.SetStateAction<UserDataContextInterface>>;
}>({
  userDataState: initialUserDataState,
  setUserDataState: () => {},
});

export function UserDataContextProvider({ children }: { children: ReactNode }) {
  const [userDataState, setUserDataState] = useState<UserDataContextInterface>(initialUserDataState);

  useEffect(() => {}, []);

  return (
    <UserDataContext.Provider value={{ userDataState, setUserDataState }}>
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserDataContext = () => useContext(UserDataContext);
