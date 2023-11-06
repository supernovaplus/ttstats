import { MouseEvent, KeyboardEvent, useEffect, useState } from 'react';
import ContentBlock from '../../components/ContentBlock';
import { getCacheStr } from '../../controllers/misc';
import { serversList } from '../../data/serversList';
import { NavLink, useFetcher } from 'react-router-dom';
import businessData from '../../data/businessData';
import { useUserDataContext } from '../../store/UserDataContext';
import { useMessager, MessagerBlock } from '../../components/MessagerBlock';
const localCacheKey = 'api_biz_data_v1.';

interface BizState {
  selectedServerEndpoint: string;
  bizData: {
    loading: boolean;
    data: any | null;
  };
}

export default function BusinessPage() {
  const { userDataState, setUserDataState } = useUserDataContext();
  const [state, setState] = useState<BizState>({
    selectedServerEndpoint: '',
    bizData: {
      loading: false,
      data: null,
    },
  });
  const { messages, addMessage, clearMessages } = useMessager();

  const selectedServerState = !state.selectedServerEndpoint
    ? null
    : userDataState.servers[state.selectedServerEndpoint];

  // useEffect(() => {
  //   if (selectedServerState && !selectedServerState.apikey) {
  //     addMessage('errors', 'No api key provided, go to api settings');
  //     console.log('yesnt');
  //   }
  // }, []);

  const onGetBusinessClicked = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    clearMessages();

    // const data = {
    //   stackLimit: 16,
    //   totalStacks: 42,
    //   businesses: {
    //     biz_horny_burgie: { earnings: 148907.5, stacks: 3 },
    //     biz_wenger: { earnings: 21598.90000000001, stacks: 3 },
    //     biz_cablecar: { earnings: 128477.3, stacks: 3 },
    //     biz_spoke_bikes: { earnings: 129784.90000000004, stacks: 3 },
    //     biz_vespucci_masks: { earnings: 88025.7, stacks: 3 },
    //     biz_integrity: { earnings: 165076.40000000005, stacks: 3 },
    //     biz_granny: { earnings: 145931.80000000005, stacks: 3 },
    //     biz_caseys_diner: { earnings: 177125.30000000005, stacks: 3 },
    //     biz_hookies: { earnings: 97884.50000000001, stacks: 3 },
    //     biz_lcport_house: { earnings: 73355.1, stacks: 3 },
    //     biz_vacaloco: { earnings: 111604.40000000008, stacks: 3 },
    //     biz_youtool_ss: { earnings: 53472.3, stacks: 3 },
    //     biz_liquor_ss: { earnings: 85971.2, stacks: 3 },
    //     biz_baracuda: { earnings: 201268.89999999997, stacks: 3 },
    //   },
    // };
    if (selectedServerState) {
      setState((s) => ({ ...s, bizData: { loading: true, data: null } }));

      fetch(`https://d.transporttycoon.eu/${selectedServerState.server.apiname}/businesses.json`, {
        headers: {
          'x-tycoon-key': selectedServerState.apikey,
        },
      })
        .then((res) => {
          const charges = res.headers.get('x-tycoon-charges');
          if (charges && !isNaN(Number(charges))) {
            setUserDataState((s) => {
              s.servers[state.selectedServerEndpoint].charges = String(charges);
              s.servers[state.selectedServerEndpoint].lastChecked = String(Date.now());
              return { ...s };
            });
          }
          return res.json();
        })
        .then((res) => {
          if (res && res.stackLimit) {
            // addMessage('messages', 'Data' + JSON.stringify(res));
            setState((s) => ({ ...s, bizData: { loading: false, data: res } }));
          } else {
            addMessage('errors', 'Server error');
            setState((s) => ({ ...s, bizData: { loading: false, data: null } }));
          }
        })
        .catch((err) => {
          addMessage('errors', 'Error: ' + err.toString());
          setState((s) => ({ ...s, bizData: { loading: false, data: null } }));
        });
    }
  };

  return (
    <ContentBlock title="Business">
      <div className="min-h-[200px]">
        <div className='bg-yellow-200'>
          api thing here:
          <NavLink
            to={`/user/settings`}
            className={({ isActive }) =>
              ` lnk-btn text-white bg-nova-c1 dark:bg-nova-c3 px-1 text-center block`
            }>
            API settings
          </NavLink>
        </div>
        <div className="flex h-10 align-middle justify-center">
          <div className="flex flex-col justify-center">
            <p>Server</p>
          </div>
          <select
            defaultValue=""
            className="p-0 m-0 ml-1 block w-full my-1 cursor-pointer text-center bg-gray-600 border border-gray-600 text-white"
            onChange={(e) => setState((s) => ({ ...s, selectedServerEndpoint: e.target.value }))}>
            <option value="" disabled>
              Select server
            </option>
            {Object.entries(userDataState.servers).map(([serverEndpoint, { server }], index) => (
              <option value={server.endpoint} key={index}>
                {server.name}
              </option>
            ))}
          </select>
        </div>
        {!state.selectedServerEndpoint && (
          <div className="text-center mt-5 w-full bg-white text-black">select the server</div>
        )}
        {state.bizData.loading && (
          <div className="text-center mt-5 w-full bg-white text-black">loading data from the api</div>
        )}
        {selectedServerState &&
          (!!selectedServerState.apikey ? (
            <>
              <div className="w-full text-center">Charges left: ~{selectedServerState.charges}</div>
              <button
                className="lnk-btn text-white bg-nova-c1 dark:bg-nova-c3 px-1 text-center block w-full max-w-[200px] m-auto"
                onClick={onGetBusinessClicked}>
                Get Businesses
              </button>
              {state.bizData.data && (
                <div className="flex flex-col">
                  <div>
                    Stack limit: {state.bizData.data.stackLimit} | Total stacks:{' '}
                    {state.bizData.data.totalStacks}
                  </div>
                  <div>
                    <table className='w-full text-center'>
                      <tbody>
                        {businessData
                          .sort((a, b) => a.cost - b.cost)
                          .map((biz, index) => {
                            const owned = state.bizData.data.businesses.hasOwnProperty(biz.id);
                            return (
                              <tr>
                                <td>#{index + 1}</td>
                                <td>{biz.name}</td>
                                <td>{biz.cost}</td>
                                <td>{biz.bonus}</td>
                                <td>{owned ? 'own' : ''}</td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>

                    {/* {Object.entries(state.bizData.data.businesses).map(
                      ([name, { earnings, stacks }]: any, index) => (
                        <div key={index}>
                          name - {name} - {earnings} - {stacks}
                        </div>
                      )
                    )} */}
                  </div>
                </div>
              )}
            </>
          ) : (
            <div>
              No api key provided or no charges left, go to{' '}
              <NavLink to="/user/settings" className="underline text-blue-400">
                api settings page
              </NavLink>
            </div>
          ))}

        <MessagerBlock messages={messages} />
      </div>
    </ContentBlock>
  );
}
