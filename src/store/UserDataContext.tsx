import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { serversList } from '../data/serversList';
import { localStorageKeys } from '../data/config';
import { UserDataContextInterface } from '../types/serverTypes';

const initialUserDataState = {
  servers: Object.fromEntries(
    serversList
      .filter((server) => server.apiKeyAllow)
      .map((server) => [
        server.endpoint,
        {
          server,
          apikey: localStorage.getItem(localStorageKeys.SERVER_API_PRIVATE_KEY + '.' + server.endpoint) || '',
          charges:
            localStorage.getItem(localStorageKeys.SERVER_API_PRIVATE_CHARGES + '.' + server.endpoint) || '',
          lastChecked:
            localStorage.getItem(localStorageKeys.SERVER_API_PRIVATE_CHECK_DATE + '.' + server.endpoint) ||
            '',
        },
      ])
  ),
  selectedUserId: localStorage.getItem(localStorageKeys.SELECTED_USER_ID) || '',
};

// console.log(initialUserDataState)

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
