import { createContext, ReactNode, useState, useEffect, useContext } from 'react';
import { localStorageKeys } from '../data/config';
import { UserDataContextInterface } from '../types/serverTypes';

const initialUserDataState: UserDataContextInterface = {
  selectedUserId: localStorage.getItem(localStorageKeys.SELECTED_USER_ID) || '',
  data1: null,
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

  // useEffect(() => {}, []);

  return (
    <UserDataContext.Provider value={{ userDataState, setUserDataState }}>
      {children}
    </UserDataContext.Provider>
  );
}

export const useUserDataContext = () => useContext(UserDataContext);
