import React, { useState, useEffect } from 'react';
import { TopTenDataState, TopTenDataResponse } from '../types/serverTypes';
import ContentBlock from '../components/ContentBlock';
import { Routes, Route, useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import { utcDate } from '../controllers/misc';

// function ProfilePage() {
//   // Get the userId param from the URL.
//   let { userId } = useParams();

//   return <>{userId}</>;
// }

export default function TopTenPage() {
  // const navigate = useNavigate();
  // const navParams = useParams();
  // let { userId } = useParams();

  const [state, setState] = useState<TopTenDataState>({
    loading: true,
    error: null,
    data: null,
    selectedStatName: 'bus_route_completed',
    bannedPlayersList: new Set(),
  });

  useEffect(() => {
    let isSubscribed = true;

    fetch('https://api.transporttycoon.eu/banned-top.json')
      .then((res) => res.json())
      .then((res: number[]) => {
        if (res && Array.isArray(res) && isSubscribed) {
          setState((s) => ({
            ...s,
            bannedPlayersList: new Set(res),
          }));
        }
      })
      .catch(() => {});

    fetch('https://d3.ttstats.eu/data/top10_v2.json')
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
  }, []);

  return (
    <>
      <ContentBlock>
        <div className="text-center text-lg">Top 10 Leaderboards</div>
        {state.loading && <div className="p-2 text-center">Loading...</div>}
        {state.error && (
          <div className="bg-red-600 p-2 text-center">
            {state.error === null ? '' : 'Error: ' + state.error}
          </div>
        )}
        {state.data && (
          <>
            <div className="text-sm text-center">Select Top 10 Categories</div>
            <div className="max-h-52 overflow-y-auto flex flex-col">
              {state.data.map(({ nice_name, stat_name }, index) => (
                <NavLink
                  to={`/top10/${stat_name}`}
                  key={index}
                  className={({ isActive }) =>
                    `odd:bg-kebab-odd even:bg-kebab-even dark:text-white hover:bg-kebab-dk py-1 block text-center select-none ${
                      isActive ? 'underline' : ''
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
  let { statId } = useParams();
  // console.log({ statId, s: state.data });
  const selectedBoard = (state.data || []).find((board) => board.stat_name === statId);
  if (!selectedBoard) return <ContentBlock title="No Data" />;

  return (
    <ContentBlock title={selectedBoard.nice_name}>
      <table className="w-full text-center">
        <thead className="sticky top-0 bg-gray-400 dark:bg-kebab-bg-dm">
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
                <span className={'text-xs bg-gray-400 dark:text-white dark:bg-black p-1 rounded'}>
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
      <div className="text-right text-xs mt-4">Updated: {utcDate(selectedBoard.updated_at)}</div>
    </ContentBlock>
  );
}
