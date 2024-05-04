import { MouseEvent, ChangeEvent, useEffect, useState, ReactNode, useMemo } from 'react';
import ContentBlock from '../../components/ContentBlock';
import { getCacheStr, prettyNum, shortenLargeMoney } from '../../controllers/misc';
import { NavLink, useSearchParams } from 'react-router-dom';
import businessData, { bizDataUpdatedAt } from '../../data/businessData';
import { useUserDataContext } from '../../store/UserDataContext';
import { useMessager, MessagerBlock } from '../../components/MessagerBlock';
// import UserSettingsPage from './UserSettingsPage';
// import { fetchTTApi } from '../../controllers/fetchTTApi';
import { usePersistantState } from '../../controllers/misc';
const LOCAL_STORAGE_KEY = 'bizOwnedList';

interface BizState {
  filterOwned: boolean;
  bizData: {
    loading: boolean;
    data: any | null;
  };
}

const initialBizState: BizState = {
  filterOwned: false,
  bizData: {
    loading: false,
    data: null,
  },
};

const MarkValue = ({ children }: { children: ReactNode }) => {
  return <span className="px-2 py-0.5 rounded-sm bg-gray-700 border border-black">{children}</span>;
};

// function useQuery() {
//   const { search } = useLocation();
//   return useMemo(() => new URLSearchParams(search), [search]);
// }

export default function BusinessPage() {
  const { userDataState, setUserDataState } = useUserDataContext();
  const [state, setState] = useState({ ...initialBizState });
  const { messages, addMessage, clearMessages } = useMessager();
  const [searchParams, setSearchParams] = useSearchParams();
  const [bizOwnedState, setBizOwnedState] = usePersistantState<{ [key: string]: boolean }>(
    LOCAL_STORAGE_KEY,
    {}
  );

  const serverId = searchParams.get('serverId') || '2epova';
  const page = searchParams.get('page');
  // const { server, page } = useParams();
  // console.log(server, page);

  const selectedServerState = !serverId ? null : userDataState.servers[serverId];

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

  const toggleBiz = (bizId: string) => {
    setBizOwnedState((s) => {
      const newState = { ...s };
      if (s.hasOwnProperty(bizId)) {
        delete newState[bizId];
      } else {
        newState[bizId] = true;
      }
      return newState;
    });
  };

  const filteredBusineses = businessData
    .sort((a, b) => {
      if (a.id === 'biz_pacific_standard') return Infinity;
      if (b.id === 'biz_pacific_standard') return -Infinity;
      return a.cost - b.cost;
    })
    .map((biz, index) => {
      const owned = bizOwnedState.hasOwnProperty(biz.id);

      if (owned) {
        businessesOwned++;
        myBonus += biz.bonus;
        myMoneySpent += biz.cost;
        // earningFromApi += state.bizData?.data?.businesses[biz.id].earnings;
        if (biz.id === 'biz_pacific_standard') bankOwned = true;
      }

      totalMoneyToSpend += biz.cost;
      totalPossibleBonus += biz.bonus;

      if (state.filterOwned && owned) {
        return <tr key={index}></tr>;
      } else {
        visibleBusinesses++;
      }

      return (
        <tr key={index} className={`odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk`}>
          <td>#{index + 1}</td>
          <td><input type="checkbox" name={`biz-${biz.id}`} className='cursor-pointer' checked={owned} onChange={() => toggleBiz(biz.id)} /></td>
          <td
            title={biz.id}
            onClick={() => toggleBiz(biz.id)}
            className={`cursor-pointer hover:underline ${owned ? 'text-green-800 dark:text-green-500 line-through' : ''}`}>
            {biz.name}
            {owned ? ' ✅' : ''}
          </td>
          <td>${shortenLargeMoney(biz.cost)}</td>
          <td>${shortenLargeMoney(biz.bonus)}</td>
          <td>{biz.visuallvl}</td>
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

  // const onGetBiz = (e: MouseEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   clearMessages();

  //   if (!selectedServerState) return;
  //   setState((s) => ({ ...s, bizData: { loading: true, data: null } }));

  //   fetchTTApi({
  //     uri: `https://d.transporttycoon.eu/${selectedServerState.server.apiname}/getuserbiz/${state.selectedUserId}`,
  //     apiKey: selectedServerState.apikey,
  //     setUserDataState,
  //     endpoint: selectedServerState.server.endpoint,
  //   })
  //     .then((res) => {
  //       if (res.businesses && typeof res.businesses === 'object') {
  //         setState((s) => ({ ...s, bizData: { loading: false, data: res } }));
  //       } else {
  //         throw new Error('No data received');
  //       }
  //     })
  //     .catch((err) => {
  //       addMessage('errors', err.toString());
  //       setState((s) => ({ ...s, bizData: { loading: false, data: null } }));
  //     });
  // };

  return (
    <ContentBlock title="Business">
      <div style={{ minHeight: '200px', maxHeight: '90vh' }}>
        <div
          style={{ maxHeight: '600px' }}
          className="overflow-y-auto flex flex-col border-b-2 border-nova-c1 dark:border-nova-c3 box-shadow-1">
          <div className="border-b-2 border-nova-c1 dark:border-nova-c3">
            <table className="w-full text-center">
              <thead className="sticky top-0 text-white bg-nova-c1 dark:bg-nova-c3">
                <tr>
                  <th>#</th>
                  <th className='text-sm'>Owned</th>
                  <th>Name</th>
                  <th>Price</th>
                  <th>
                    Bonus per day
                    <br />
                    <span className="text-xs">(8 stacks)</span>
                  </th>
                  <th>Lvl</th>
                  <th>Map</th>
                </tr>
              </thead>
              <tbody>
                {visibleBusinesses > 0 ? (
                  filteredBusineses
                ) : (
                  <tr>
                    <td colSpan={5} className="min-h-[100px] py-10">
                      No businesses left to buy
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="p-1 mt-1 text-white">
          <div className="flex gap-1 flex-wrap justify-center py-1 w-full mb-1">
            <div className=" px-2 bg-nova-c1 dark:bg-nova-c3 box-shadow-4">
              total businesses: <MarkValue>{businessData.length}</MarkValue>
            </div>
            <div className=" px-2 bg-nova-c1 dark:bg-nova-c3 box-shadow-4">
              total cost: <MarkValue>{shortenLargeMoney(totalMoneyToSpend)}</MarkValue>
            </div>
            <div className=" px-2 bg-nova-c1 dark:bg-nova-c3 box-shadow-4">
              total bonus pre-tax: <MarkValue>{shortenLargeMoney(totalPossibleBonus * 8)}</MarkValue> per day
            </div>

            {!!businessesOwned && (
              <>
                <div className="border px-2 bg-nova-c1 dark:bg-nova-c3 border-black box-shadow-4">
                  busineses you own:{' '}
                  <MarkValue>
                    {businessesOwned}/{businessData.length}
                  </MarkValue>
                </div>
                <div className="border px-2 bg-nova-c1 dark:bg-nova-c3 border-black box-shadow-4">
                  money invested:{' '}
                  <MarkValue>
                    {shortenLargeMoney(myMoneySpent)}
                    {totalMoneyToSpend !== myMoneySpent && <>/{shortenLargeMoney(totalMoneyToSpend)}</>}
                  </MarkValue>
                </div>
                <div className="border px-2 bg-nova-c1 dark:bg-nova-c3 border-black box-shadow-4">
                  money left to invest:{' '}
                  <MarkValue>
                    {totalMoneyToSpend - myMoneySpent === 0
                      ? '-'
                      : shortenLargeMoney(totalMoneyToSpend - myMoneySpent)}
                  </MarkValue>
                </div>
                <div className="border px-2 bg-nova-c1 dark:bg-nova-c3 border-black box-shadow-4">
                  your daily bonus pre-tax: <MarkValue>{shortenLargeMoney(totalBonusInDay)}</MarkValue> per
                  day
                </div>
                <div className="border px-2 bg-nova-c1 dark:bg-nova-c3 border-black box-shadow-4">
                  your bonus after {bankOwned ? '20%' : '30%'} tax:{' '}
                  <MarkValue>{shortenLargeMoney(totalBonusInDayAfterTax)}</MarkValue> per day
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </ContentBlock>
  );
}
