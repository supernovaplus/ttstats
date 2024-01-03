import React, { useState, useEffect } from 'react';
import { TopTenDataState, TopTenDataResponse } from '../types/serverTypes';
import ContentBlock from '../components/ContentBlock';
import { Routes, Route, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { TimeUpdatedRow, LoadingRow, ErrorRow } from '../components/MiscComponents';

const DATALINKS = [
  ['Wipe 2.0 (current)', 'https://d3.ttstats.eu/data/top10_v3.json'],
  ['Legacy (No longer updated)', 'https://d3.ttstats.eu/data/top10_v2.json'],
];

const initalState: TopTenDataState = {
  loading: true,
  error: null,
  data: null,
  selectedStatName: 'bus_route_completed',
  bannedPlayersList: new Set(),
  selectedServer: 0,
};

export default function TopTenPage() {
  const [state, setState] = useState<TopTenDataState>({ ...initalState });

  const changeServer: React.ChangeEventHandler<HTMLSelectElement> = (e) => {
    setState((s) => ({
      ...initalState,
      selectedServer: parseInt(e.target.value),
    }));
  };

  useEffect(() => {
    let isSubscribed = true;

    // fetch('https://api.transporttycoon.eu/banned-top.json')
    //   .then((res) => res.json())
    //   .then((res: number[]) => {
    //     if (res && Array.isArray(res) && isSubscribed) {
    //       setState((s) => ({
    //         ...s,
    //         bannedPlayersList: new Set(res),
    //       }));
    //     }
    //   })
    //   // eslint-disable-next-line @typescript-eslint/no-empty-function
    //   .catch(() => { });

    fetch(DATALINKS[state.selectedServer][1])
      .then((res) => res.json())
      .then((res: TopTenDataResponse) => {
        if (!res || !res.data || !Array.isArray(res.data)) throw new Error('no data received');

        if (isSubscribed) {
          setState((s) => ({
            ...s,
            loading: false,
            error: null,
            data: res.data,
            selectedStatName: '',
          }));
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err);
          setState((s) => ({
            ...s,
            loading: false,
            error: 'Failed to load the data, try again later.',
            data: null,
            selectedStatName: '',
          }));
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [state.selectedServer]);

  return (
    <>
      <ContentBlock title="Top 10 Leaderboards">
        <div className="flex p-1">
          <div className="p-1">Server: </div>
          <select
            className="p-0 m-0 ml-1 block w-full my-1 cursor-pointer text-center bg-gray-600 border border-gray-600 text-white"
            defaultValue={'0'}
            onChange={changeServer}>
            {DATALINKS.map(([name, link], index) => (
              <option key={index} value={index} className="text-center p-2">
                {name}
              </option>
            ))}
          </select>
        </div>
        {state.loading && <LoadingRow />}
        {state.error && <ErrorRow>{state.error}</ErrorRow>}
        {state.data && (
          <>
            <div className="text-center bg-nova-c1 text-white dark:bg-nova-c3 select-none text-sm py-1">
              Select Top 10 Categories
            </div>
            <div className="max-h-52 overflow-y-auto flex flex-col border-b-2 border-nova-c1 dark:border-nova-c3 box-shadow-1">
              {state.data.map(({ nice_name, stat_name }, index) => (
                <NavLink
                  to={`/top10/${stat_name}`}
                  key={index}
                  className={({ isActive }) =>
                    ` dark:text-white hover:underline py-1 block text-center select-none border-b border-nova-c2 ${
                      isActive ? 'bg-nova-c1 dark:bg-nova-c2 text-white' : ''
                    }`
                  }>
                  {nice_name}
                </NavLink>
              ))}
            </div>
          </>
        )}
      </ContentBlock>

      <Routes>
        <Route
          index
          element={
            !state.loading &&
            state.data && (
              <ContentBlock>
                <div className="text-center">Select Top 10 Board</div>
              </ContentBlock>
            )
          }
        />
        <Route path=":statId" element={<Board state={state} />} />
      </Routes>
    </>
  );
}

function Board({ state }: { state: TopTenDataState }) {
  const { statId } = useParams();
  // console.log({ statId, s: state.data });
  const selectedBoard = (state.data || []).find((board) => board.stat_name === statId);
  if (!selectedBoard) return <ContentBlock title="No Data" />;

  return (
    <ContentBlock title={selectedBoard.nice_name}>
      <div className=" border-b-2 border-nova-c1 dark:border-nova-c3">
        <table className="w-full text-center">
          <thead className="sticky top-0 text-white bg-nova-c1 dark:bg-nova-c3 z-0">
            <tr>
              <th>#</th>
              <th>Player</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {selectedBoard.json_data.map((row, index2) => (
              <tr
                key={index2}
                className={`odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk ${
                  state.bannedPlayersList.has(row.user_id)
                    ? 'line-through text-gray-400 dark:text-gray-600'
                    : ''
                }`}>
                <td data-label="# Place">{index2 + 1}</td>
                <td data-label="Player">
                  {row.username}{' '}
                  <span className={'text-xs bg-gray-400 dark:text-white dark:bg-nova-c3 p-1 rounded'}>
                    #{row.user_id}
                  </span>
                </td>
                <td data-label="Amount">
                  {selectedBoard.prefix} {row.amount.toLocaleString('en-us')} {selectedBoard.suffix}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TimeUpdatedRow updated_at={selectedBoard.updated_at} />
    </ContentBlock>
  );
}
