import { UserDataContextInterface } from '../types/serverTypes';

interface SyncDataInterface {
  endpoint: string;
  setUserDataState: React.Dispatch<React.SetStateAction<UserDataContextInterface>>;
}

export const syncData = ({ endpoint, setUserDataState }: SyncDataInterface) =>
  fetch(endpoint, {
    method: 'GET',
  })
    .then((res) => {
      console.log(res);
      return res.json();
    })
    .then((res: any) => {
      if (res) {
        console.log('res yes');
        setUserDataState(s => ({...s, data1: new Set(res.data)}))
        if (res.error) throw new Error(res.error);
        // addMessage('messages', 'Data' + JSON.stringify(res));
        return res;
      } else {
        throw new Error('No data received');
      }
    });
// .catch((err) => {
//   addMessage('errors', 'Error: ' + err.toString());
//   setState((s) => ({ ...s, bizData: { loading: false, data: null } }));
// });
