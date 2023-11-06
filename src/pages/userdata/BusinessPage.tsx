import { MouseEvent, ChangeEvent, useEffect, useState, ReactNode } from 'react';
import ContentBlock from '../../components/ContentBlock';
import { getCacheStr, prettyNum, shortenLargeMoney } from '../../controllers/misc';
import { serversList } from '../../data/serversList';
import { NavLink, useFetcher } from 'react-router-dom';
import businessData from '../../data/businessData';
import { useUserDataContext } from '../../store/UserDataContext';
import { useMessager, MessagerBlock } from '../../components/MessagerBlock';

interface BizState {
  selectedServerEndpoint: string;
  bizData: {
    loading: boolean;
    data: any | null;
  };
}

const initialBizState: BizState = {
  selectedServerEndpoint: '',
  bizData: {
    loading: false,
    data: null,
  },
};

const MarkValue = ({ children }: { children: ReactNode }) => {
  return <span className="bg-gray-600 px-2 py-1">{children}</span>;
};

export default function BusinessPage() {
  const { userDataState, setUserDataState } = useUserDataContext();
  const [state, setState] = useState(initialBizState);
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

  let businessesOwned = 0;
  let myBonus = 0;
  let myMoneySpent = 0;
  let totalPossibleBonus = 0;
  let totalMoneyToSpend = 0;
  // let userDailyBonus += Math.floor(biz.id.includes('biz_train') ? myBonus - myBonus * 0.2 : myBonus);
  // let userTaxedDailyBonus += Math.floor(myBonus - myBonus * 0.2);

  const filteredBusineses = businessData
    .sort((a, b) => {
      if (a.id === 'biz_pacific_standard') return a.cost + 1;
      return a.cost - b.cost;
    })
    .map((biz, index) => {
      const owned = state.bizData?.data?.businesses.hasOwnProperty(biz.id);
      if (owned) {
        businessesOwned++;
        myBonus += biz.bonus;
        myMoneySpent += biz.cost;
      }
      totalMoneyToSpend += biz.cost;
      totalPossibleBonus += biz.bonus;

      return (
        <tr key={index}>
          <td>#{index + 1}</td>
          <td title={biz.id}>
            {biz.name}
            {owned ? ' ✅' : ''}
          </td>
          <td>${shortenLargeMoney(biz.cost)}</td>
          <td>${shortenLargeMoney(biz.bonus)}</td>
        </tr>
      );
    });

  const onServerChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setState({ ...initialBizState, selectedServerEndpoint: e.target.value });
  };

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

      //curent bussiness
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
      <div style={{ minHeight: '200px', maxHeight: '90vh' }}>
        <div
          style={{ maxHeight: '600px' }}
          className="overflow-y-auto flex flex-col border-b-2 border-nova-c1 dark:border-nova-c3 box-shadow-1">
          <div className=" border-b-2 border-nova-c1 dark:border-nova-c3">
            <table className="w-full text-center">
              <thead className="sticky top-0 text-white bg-nova-c1 dark:bg-nova-c3 z-0">
                <tr>
                  <th>x</th>
                  <th>x</th>
                  <th>x</th>
                  <th>x</th>
                </tr>
              </thead>
              <tbody>{filteredBusineses}</tbody>
            </table>
          </div>
        </div>

        <div className="bg-black p-1 mt-2 border text-white">
          <div className="flex gap-1 bg-slate-500 flex-wrap justify-center py-1 w-full">
            {state.bizData?.data?.stackLimit ? (
              <>
                <div className="border px-2">
                  my stack limit: <MarkValue>{state.bizData?.data?.stackLimit}</MarkValue>
                </div>
                <div className="border px-2">
                  my total stacks: <MarkValue>{state.bizData?.data?.totalStacks}</MarkValue>
                </div>
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
                    {totalMoneyToSpend - myMoneySpent === 0 ? '-' : totalMoneyToSpend - myMoneySpent}
                  </MarkValue>
                </div>
                <div className="border px-2">
                  my raw bonus: <MarkValue>{shortenLargeMoney((myBonus) * 8)}</MarkValue>{' '}
                  per day
                </div>
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
                  total raw bonus: <MarkValue>{shortenLargeMoney(totalPossibleBonus * 8)}</MarkValue> per day
                </div>
              </>
            )}
          </div>
          <div className="flex gap-1 flex-wrap justify-center py-1 w-full bg-black">
            <div>My bussiness</div>
            <NavLink
              to={`/user/settings`}
              className={({ isActive }) =>
                `px-1 bg-white text-black inline-block align-middle text-shadow-none hover:bg-gray-200`
              }>
              API settings
            </NavLink>
            <select defaultValue="" className="text-black px-2 cursor-pointer" onChange={onServerChange}>
              <option value="">No server selected</option>
              {Object.entries(userDataState.servers).map(([serverEndpoint, { server }], index) => (
                <option value={server.endpoint} key={index}>
                  {server.name}
                </option>
              ))}
            </select>
            {selectedServerState && (
              <>
                {selectedServerState.apikey ? (
                  <input
                    type="button"
                    value="update bussinesses"
                    className="px-2 bg-white text-black cursor-pointer"
                    onClick={onGetBusinessClicked}
                  />
                ) : (
                  <div className="w-full text-center bg-red-600">no api key provided, go to api settings</div>
                )}
              </>
            )}
            {state.bizData.loading && (
              <div className="text-center w-full bg-yellow-200 text-black">loading data from the api</div>
            )}
          </div>
        </div>

        <MessagerBlock messages={messages} />
      </div>
    </ContentBlock>
  );
}
