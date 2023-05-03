import React, { useState, useEffect, ChangeEvent } from 'react';
import { TopTenDataState, TopTenDataResponse } from '../types/serverTypes';
import ContentBlock from '../components/ContentBlock';

export default function TopTenPage() {
  const [state, setState] = useState<TopTenDataState>({
    loading: true,
    error: null,
    data: null,
    selected: [],
    banned_players: new Set(),
  });

  const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setState((s) => ({
      ...s,
      selected: [...event.target.selectedOptions].map((item) => Number(item.value)),
    }));
    // console.log(event);
  };

  //   const savedTop10Statuses =
  // state.loading === false && localStorage.getItem('top10') ? JSON.parse(localStorage.getItem('top10')) : {};

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isSubscribed = true;

    fetch('https://api.transporttycoon.eu/banned-top.json')
      .then((res) => res.json())
      .then((res: number[]) => {
        if (res && Array.isArray(res) && isSubscribed) {
          setState((s) => ({
            ...s,
            banned_players: new Set(res),
          }));
        }
      })
      .catch(() => {});

    fetch('https://d3.ttstats.eu/data/top10.json', { signal })
      .then((res) => res.json())
      .then((data: TopTenDataResponse[]) => {
        if (isSubscribed) {
          setState((s) => ({
            ...s,
            loading: false,
            error: null,
            data,
            selected: [0],
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
            selected: [],
          }));
        }
      });
    return () => {
      controller.abort();
      isSubscribed = false;
    };
  }, []);

  if (!state.loading && state.data && !state.data.length) {
    setState((s) => ({
      ...s,
      loading: false,
      error: 'Failed to load the data, try again later.',
      data: null,
      selected: [],
    }));
  }

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
            <div className="text-sm text-center">Select Top 10 Categories (multiple selection)</div>
            <select
              onChange={onChange}
              name="top-ten-selector"
              multiple
              defaultValue={['0']}
              className="w-full cursor-pointer text-center sm:min-h-[250px] bg-gray-50  text-gray-900  block dark:bg-kebab-bg-dm  dark:placeholder-gray-400 dark:text-white border-t border-b border-white mt-2 outline-none">
              {state.data.map(({ nice_name }, index) => (
                <option
                  key={index}
                  value={index}
                  className="odd:bg-kebab-odd even:bg-kebab-even dark:text-white hover:bg-kebab-dk py-1">
                  {/* className="odd:bg-kebab-odd even:bg-kebab-even dark:text-white hover:bg-kebab-dk border-b  border-gray-400 border-dashed"> */}
                  {nice_name}
                </option>
              ))}
            </select>
          </>
        )}
      </ContentBlock>

      {state.data && (
        <>
          {state.selected.map((index) => {
            const board = state.data?.[index];
            if (!board) return <></>;
            return (
              <ContentBlock title={board.nice_name} key={index}>
                <table className="w-full text-center">
                  <thead className="sticky top-0 bg-gray-400 dark:bg-kebab-bg-dm">
                    <tr>
                      <th>#</th>
                      <th>Player</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {board.json_data.map((row, index2) => (
                      <tr
                        key={index2}
                        className={`odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk ${
                          state.banned_players.has(row.user_id)
                            ? 'line-through text-gray-400 dark:text-gray-600'
                            : ''
                        }`}>
                        <td data-label="# Place">{index2 + 1}</td>
                        <td data-label="Player">
                          {row.username} <span className={'text-xs text-white bg-black p-1 rounded'}>#{row.user_id}</span>
                        </td>
                        <td data-label="Amount">
                          {board.prefix} {row.amount.toLocaleString('en-us')} {board.suffix}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="text-right text-xs mt-4">
                  Updated: {new Date(board.updated_at).toLocaleString('en-GB', { timeZone: 'UTC' })}{' '}
                  (UTC)
                </div>
              </ContentBlock>
            );
          })}
        </>
      )}
    </>
  );
}
