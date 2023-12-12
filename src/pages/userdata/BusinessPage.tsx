import { MouseEvent, ChangeEvent, useEffect, useState, ReactNode, useMemo } from 'react';
import ContentBlock from '../../components/ContentBlock';
import { getCacheStr, prettyNum, shortenLargeMoney } from '../../controllers/misc';
import { NavLink, useSearchParams } from 'react-router-dom';
import businessData from '../../data/businessData';
import { useUserDataContext } from '../../store/UserDataContext';
import { useMessager, MessagerBlock } from '../../components/MessagerBlock';
import UserSettingsPage from './UserSettingsPage';
import { fetchTTApi } from '../../controllers/fetchTTApi';

interface BizState {
  selectedUserId: string;
  selectedServerEndpoint: string;
  bizData: {
    loading: boolean;
    data: any | null;
  };
  filterOwned: boolean;
}

const initialBizState: BizState = {
  selectedUserId: '',
  selectedServerEndpoint: '2epova',
  filterOwned: false,
  bizData: {
    loading: false,
    data: null,
  },
};

const MarkValue = ({ children }: { children: ReactNode }) => {
  return <span className="bg-gray-600 px-2 py-1">{children}</span>;
};

const calculateBonus = (tier1Cost: number, tier: number) => {
  return tier === 1 ? tier1Cost : tier1Cost + tier1Cost * tier * 0.25;
};

// function useQuery() {
//   const { search } = useLocation();
//   return useMemo(() => new URLSearchParams(search), [search]);
// }

export default function BusinessPage() {
  const { userDataState, setUserDataState } = useUserDataContext();
  const [state, setState] = useState({ ...initialBizState, selectedUserId: userDataState.selectedUserId });
  const { messages, addMessage, clearMessages } = useMessager();
  const [searchParams, setSearchParams] = useSearchParams();

  // Access individual parameters
  const serverId = searchParams.get('serverId') || '2epova';
  const page = searchParams.get('page');
  console.log({ serverId, page });
  // const { server, page } = useParams();
  // console.log(server, page);

  const selectedServerState = !serverId ? null : userDataState.servers[serverId];

  const loggedIn = !!state.bizData?.data?.businesses;
  const isTiered = selectedServerState?.server.endpoint === 'njyvop';
  let businessesOwned = 0;
  let myBonus = 0;
  let myMoneySpent = 0;
  let totalPossibleBonus = 0;
  let totalMoneyToSpend = 0;
  // let earningFromApi = 0;
  let bankOwned = false;
  let visibleBusinesses = 0;

  // let userDailyBonus += Math.floor(biz.id.includes('biz_train') ? myBonus - myBonus * 0.2 : myBonus);
  // let userTaxedDailyBonus += Math.floor(myBonus - myBonus * 0.2);

  const filteredBusineses = businessData
    .sort((a, b) => {
      if (a.id === 'biz_pacific_standard') return Infinity;
      if (b.id === 'biz_pacific_standard') return -Infinity;
      return a.cost - b.cost;
    })
    .map((biz, index) => {
      const owned = state.bizData?.data?.businesses.hasOwnProperty(biz.id);
      const upgradable = biz.id !== 'biz_pacific_standard';
      let tier = 1;
      if (owned) {
        tier = state.bizData?.data?.businesses[biz.id] || 1;
        businessesOwned++;
        myBonus += calculateBonus(biz.bonus, tier);
        myMoneySpent += biz.cost * tier;
        // earningFromApi += state.bizData?.data?.businesses[biz.id].earnings;
        if (biz.id === 'biz_pacific_standard') bankOwned = true;
      }
      totalMoneyToSpend += biz.cost;
      totalPossibleBonus += biz.bonus;
      if (isTiered && upgradable) {
        totalMoneyToSpend += biz.cost * 99;
        totalPossibleBonus += biz.bonus * 0.25 * 99;
      }

      if (state.filterOwned && owned) {
        return <tr key={index}></tr>;
      } else {
        visibleBusinesses++;
      }

      return (
        <tr key={index}>
          <td>#{index + 1}</td>
          <td title={biz.id}>
            {biz.name}
            {owned ? ' ✅' : ''}
          </td>
          {loggedIn && (
            <>
              <td>${totalMoneyToSpend - (biz.cost + biz.cost * tier)}</td>
              {isTiered && <td>{tier}</td>}
            </>
          )}
          <td>${shortenLargeMoney(biz.cost)}</td>
          <td>${shortenLargeMoney(calculateBonus(biz.bonus, tier))}</td>
          <td>
            <a
              href={`https://ttmap.eu/?x=${biz.position.x}&y=${biz.position.y}&hideplayers`}
              target="_blank"
              className="text-s underline text-black dark:text-white hover:text-gray-500 dark:hover:text-gray-400">
              map
            </a>
          </td>
        </tr>
      );
    });

  const totalBonusInDay = myBonus * 8;
  const totalBonusInDayAfterTax = totalBonusInDay * (bankOwned ? 0.8 : 0.7);

  // const onServerChange = (endpoint: string) => {
  //   setState((s) => ({ ...s, bizData: initialBizState.bizData }));
  // };

  // const onServerChange = (e: ChangeEvent<HTMLSelectElement>) => {
  //   setState((s) => ({ ...s, bizData: initialBizState.bizData, selectedServerEndpoint: e.target.value }));
  // };

  const onGetBiz = (e: MouseEvent<HTMLInputElement>) => {
    e.preventDefault();
    clearMessages();

    if (!selectedServerState) return;
    setState((s) => ({ ...s, bizData: { loading: true, data: null } }));

    fetchTTApi({
      uri: `https://d.transporttycoon.eu/${selectedServerState.server.apiname}/getuserbiz/${state.selectedUserId}`,
      apiKey: selectedServerState.apikey,
      setUserDataState,
      endpoint: selectedServerState.server.endpoint,
    })
      .then((res) => {
        if (res.businesses && typeof res.businesses === 'object') {
          setState((s) => ({ ...s, bizData: { loading: false, data: res } }));
        } else {
          throw new Error('No data received');
        }
      })
      .catch((err) => {
        addMessage('errors', err.toString());
        setState((s) => ({ ...s, bizData: { loading: false, data: null } }));
      });

    //curent bussiness
    // fetch(
    //   `https://d.transporttycoon.eu/${selectedServerState.server.apiname}/getuserbiz/${state.selectedUserId}`,
    //   {
    //     headers: {
    //       'x-tycoon-key': selectedServerState.apikey,
    //     },
    //   }
    // )
    //   .then((res) => {
    //     const charges = res.headers.get('x-tycoon-charges');
    //     if (charges && !isNaN(Number(charges))) {
    //       setUserDataState((s) => {
    //         s.servers[state.selectedServerEndpoint].charges = String(charges);
    //         s.servers[state.selectedServerEndpoint].lastChecked = String(Date.now());
    //         return { ...s };
    //       });
    //     } else {
    //       throw new Error('No charges available or api key is invalid');
    //     }
    //     return res.json();
    //   })
    //   .then((res) => {
    //     if (res && res.stackLimit) {
    //       // addMessage('messages', 'Data' + JSON.stringify(res));
    //       setState((s) => ({ ...s, bizData: { loading: false, data: res } }));
    //     } else {
    //       throw new Error('No data received');
    //     }
    //   })
    //   .catch((err) => {
    //     addMessage('errors', 'Error: ' + err.toString());
    //     setState((s) => ({ ...s, bizData: { loading: false, data: null } }));
    //   });
  };

  // const onGetStacksData = (e: MouseEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   clearMessages();

  //   // const data = {
  //   //   stackLimit: 16,
  //   //   totalStacks: 42,
  //   //   businesses: {
  //   //     biz_horny_burgie: { earnings: 148907.5, stacks: 3 },
  //   //     biz_wenger: { earnings: 21598.90000000001, stacks: 3 },
  //   //     biz_cablecar: { earnings: 128477.3, stacks: 3 },
  //   //     biz_spoke_bikes: { earnings: 129784.90000000004, stacks: 3 },
  //   //     biz_vespucci_masks: { earnings: 88025.7, stacks: 3 },
  //   //     biz_integrity: { earnings: 165076.40000000005, stacks: 3 },
  //   //     biz_granny: { earnings: 145931.80000000005, stacks: 3 },
  //   //     biz_caseys_diner: { earnings: 177125.30000000005, stacks: 3 },
  //   //     biz_hookies: { earnings: 97884.50000000001, stacks: 3 },
  //   //     biz_lcport_house: { earnings: 73355.1, stacks: 3 },
  //   //     biz_vacaloco: { earnings: 111604.40000000008, stacks: 3 },
  //   //     biz_youtool_ss: { earnings: 53472.3, stacks: 3 },
  //   //     biz_liquor_ss: { earnings: 85971.2, stacks: 3 },
  //   //     biz_baracuda: { earnings: 201268.89999999997, stacks: 3 },
  //   //   },
  //   // };
  //   if (!selectedServerState) return;
  //   setState((s) => ({ ...s, bizData: { loading: true, data: null } }));

  //   //curent bussiness
  //   fetch(`https://d.transporttycoon.eu/${selectedServerState.server.apiname}/businesses.json`, {
  //     headers: {
  //       'x-tycoon-key': selectedServerState.apikey,
  //     },
  //   })
  //     .then((res) => {
  //       const charges = res.headers.get('x-tycoon-charges');
  //       if (charges && !isNaN(Number(charges))) {
  //         setUserDataState((s) => {
  //           s.servers[state.selectedServerEndpoint].charges = String(charges);
  //           s.servers[state.selectedServerEndpoint].lastChecked = String(Date.now());
  //           return { ...s };
  //         });
  //       }
  //       return res.json();
  //     })
  //     .then((res) => {
  //       if (res && res.stackLimit) {
  //         // addMessage('messages', 'Data' + JSON.stringify(res));
  //         setState((s) => ({ ...s, bizData: { loading: false, data: res } }));
  //       } else {
  //         addMessage('errors', 'Server error');
  //         setState((s) => ({ ...s, bizData: { loading: false, data: null } }));
  //       }
  //     })
  //     .catch((err) => {
  //       addMessage('errors', 'Error: ' + err.toString());
  //       setState((s) => ({ ...s, bizData: { loading: false, data: null } }));
  //     });
  // };

  return (
    <ContentBlock title="Business">
      <div style={{ minHeight: '200px', maxHeight: '90vh' }}>
        {/* <select
          defaultValue={initialBizState.selectedServerEndpoint}
          className="px-2 cursor-pointer w-full text-center py-2 mb-1 border-b-2 dark:border-nova-c3 bg-gray-600 border border-gray-600 text-white"
          onChange={onServerChange}>
          {Object.entries(userDataState.servers).map(([serverEndpoint, { server }], index) => (
            <option value={serverEndpoint} key={index}>
              {server.name}
            </option>
          ))}
        </select> */}
        {/* <div className="flex">
          {Object.entries(userDataState.servers).map(([serverEndpoint, { server }], index) => (
            <NavLink
              key={index}
              to={`?serverId=${server.endpoint}`}
              className="bg-black px-2 mx-1 hover:bg-gray-700"
              onClick={() => onServerChange(server.endpoint)}>
              {server.name}
            </NavLink>
          ))}
        </div> */}
        {/* <div className="flex">
          <NavLink to={`?serverId=${serverId}&page=all`} className="bg-black px-2 mx-1 hover:bg-gray-700">
            all
          </NavLink>
          <NavLink to={`?serverId=${serverId}&page=all`} className="bg-black px-2 mx-1 hover:bg-gray-700">
            player's bussinesses
          </NavLink>
        </div> */}
        <div
          style={{ maxHeight: '600px' }}
          className="overflow-y-auto flex flex-col border-b-2 border-nova-c1 dark:border-nova-c3 box-shadow-1">
          <div className="border-b-2 border-nova-c1 dark:border-nova-c3">
            <table className="w-full text-center">
              <thead className="sticky top-0 text-white bg-nova-c1 dark:bg-nova-c3 z-0">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  {loggedIn && <th>#</th>}
                  <th>Price</th>
                  <th>Bonus per day<br/><span className='text-xs'>(8 stacks)</span></th>
                  <th>Map</th>
                </tr>
              </thead>
              <tbody>
                {visibleBusinesses > 0 ? (
                  filteredBusineses
                ) : (
                  <tr>
                    <td colSpan={5} className="min-h-[100px] py-10">
                      No bussinesses left to buy
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-1 mt-2 text-white">
          <div className="flex gap-1 bg-slate-500 flex-wrap justify-center py-1 w-full mb-1">
            {state.bizData?.data?.businesses ? (
              <>
                {/* <div className="border px-2">
                  my stack limit: <MarkValue>{state.bizData?.data?.stackLimit || '?'}</MarkValue>
                </div>
                <div className="border px-2">
                  my total stacks: <MarkValue>{state.bizData?.data?.totalStacks || '?'}</MarkValue>
                </div> */}
                <div className="border px-2">
                  busineses owned:{' '}
                  <MarkValue>
                    {businessesOwned}/{businessData.length}
                  </MarkValue>
                </div>
                <div className="border px-2">
                  money invested:{' '}
                  <MarkValue>
                    {shortenLargeMoney(myMoneySpent)}
                    {totalMoneyToSpend !== myMoneySpent && <>/{shortenLargeMoney(totalMoneyToSpend)}</>}
                  </MarkValue>
                </div>
                <div className="border px-2">
                  money left to invest:{' '}
                  <MarkValue>
                    {totalMoneyToSpend - myMoneySpent === 0
                      ? '-'
                      : shortenLargeMoney(totalMoneyToSpend - myMoneySpent)}
                  </MarkValue>
                </div>
                <div className="border px-2">
                  daily raw bonus: <MarkValue>{shortenLargeMoney(totalBonusInDay)}</MarkValue> per day
                </div>
                <div className="border px-2">
                  bonus after tax ({bankOwned ? '20%' : '30%'}):{' '}
                  <MarkValue>{shortenLargeMoney(totalBonusInDayAfterTax)}</MarkValue> per day
                </div>
                {/* {isTiered && (
                  <>
                    <div className="border px-2">
                      bonus after tax ({bankOwned ? '20%' : '30%'}):{' '}
                      <MarkValue>{shortenLargeMoney(totalBonusInDayAfterTax)}</MarkValue> per day
                    </div>
                  </>
                )} */}
                {/* <div className="border px-2">
                  earning from api: <MarkValue>{shortenLargeMoney(earningFromApi)}</MarkValue> per day
                </div> */}
              </>
            ) : (
              <>
                <div className="border px-2">
                  total bussineses: <MarkValue>{businessData.length}</MarkValue>
                </div>
                <div className="border px-2">
                  total cost: <MarkValue>{shortenLargeMoney(totalMoneyToSpend)}</MarkValue>
                </div>
                <div className="border px-2">
                  total bonus before tax: <MarkValue>{shortenLargeMoney(totalPossibleBonus * 8)}</MarkValue> per day
                </div>
              </>
            )}
          </div>
          {/* <div className="flex gap-1 flex-wrap justify-center py-1 w-full bg-black">
            <div className="border p-1 flex justify-center align-middle">
              <NavLink
                to={`/user/settings`}
                className="px-1 bg-white text-black text-shadow-none hover:bg-gray-200">
                API settings
              </NavLink>
            </div>

            {selectedServerState && (
              <>
                {selectedServerState.apikey ? (
                  <>

                    <div className="max-w-5xl border p-1">
                      Player ID:{' '}
                      <input
                        type="text"
                        value={state.selectedUserId}
                        placeholder="user id"
                        className="text-black placeholder:text-gray-500 px-1 inline-block w-20"
                        onChange={(e) => setState((s) => ({ ...s, selectedUserId: e.target.value }))}
                      />{' '}
                      <input
                        type="button"
                        onClick={onGetBiz}
                        value={`get player's biz (+-${selectedServerState.charges} charges left)`}
                        className="hover:bg-gray-200 cursor-pointer bg-white text-black px-1"
                      />
                    </div>
                    <div className="max-w-5xl border p-1">
                      Filter owned:{' '}
                      <input
                        type="checkbox"
                        onChange={(e) => setState((s) => ({ ...s, filterOwned: !s.filterOwned }))}
                      />{' '}
                    </div>
                  </>
                ) : (
                  <div className="text-center bg-gray-300 px-2 text-shadow-none text-gray-700">
                    provide api key for personal data
                  </div>
                )}
              </>
            )}

            {state.bizData.loading && (
              <div className="text-center w-full bg-yellow-200 text-black">loading data from the api</div>
            )}
          </div> */}
        </div>
        {/* <MessagerBlock messages={messages} /> */}
      </div>
    </ContentBlock>
  );
}
