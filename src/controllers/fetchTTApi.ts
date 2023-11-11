import { UserDataContextInterface } from '../types/serverTypes';

interface FetchApiInterface {
  uri: string;
  apiKey: string;
  endpoint: string;
  setUserDataState: React.Dispatch<React.SetStateAction<UserDataContextInterface>>;
}

export const fetchTTApi = ({ uri, apiKey, endpoint, setUserDataState }: FetchApiInterface) =>
  fetch(uri, {
    method: "GET",
    headers: {
      'x-tycoon-key': apiKey,
    },
  })
    .then((res) => {
      const charges = res.headers.get('x-tycoon-charges');
      if (charges && !isNaN(Number(charges))) {
        setUserDataState((s) => {
          s.servers[endpoint].charges = String(charges);
          s.servers[endpoint].lastChecked = String(Date.now());
          return { ...s };
        });
      } else {
        throw new Error('No charges available or api key is invalid');
      }
      return res.json();
    })
    .then((res) => {
      if (res) {
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
