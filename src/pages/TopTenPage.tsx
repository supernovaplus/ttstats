import React, { useState, useEffect, ChangeEvent } from 'react';
import { TopTenData, TopTenDataState, TopTenDataResponse } from '../types/serverTypes';
import ContentBlock from '../components/ContentBlock';

interface TopTenBlockProps {
  board: TopTenData;
  state: TopTenDataState;
}

function TopTenBlock({ board, state }: TopTenBlockProps) {
  return (
    <ContentBlock title={board.title}>
      <table className="w-full text-center">
        <thead>
          <tr>
            <th>#</th>
            {board.labels.map((label, index2) => (
              <th key={index2}>{label}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {board.rows
            // .filter((row) => !state.banned_players.has(Number(String(row[0]).slice(1))))
            .map((row, index2) => (
              <tr
                key={index2}
                title={`Player ID: ${String(row[0])}`}
                className={`odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk ${
                  state.banned_players.has(Number(String(row[0]).slice(1))) ? 'line-through text-gray-400 dark:text-gray-600' : ''
                }`}>
                <td data-label="# Place">{index2 + 1}</td>
                {board.rows[index2].slice(1).map((column, index3) => (
                  <td key={index3} data-label={board.labels[index3]}>
                    {column}
                  </td>
                ))}
              </tr>
            ))}
        </tbody>
      </table>
    </ContentBlock>
  );
}

export default function TopTenPage() {
  const [state, setState] = useState<TopTenDataState>({
    loading: true,
    error: null,
    data: null,
    timestamp: 0,
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

    fetch('https://api.transporttycoon.eu/top10.json', { signal })
      .then((res) => res.json())
      .then((res: TopTenDataResponse) => {
        if (isSubscribed) {
          setState((s) => ({
            ...s,
            loading: false,
            error: null,
            data: res.data,
            timestamp: res.timestamp,
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
            timestamp: 0,
            selected: [],
          }));
        }
      });
    return () => {
      controller.abort();
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.loading && state.data && !state.data.length) {
    setState((s) => ({
      ...s,
      loading: false,
      error: 'Failed to load the data, try again later.',
      data: null,
      timestamp: 0,
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
              className="w-full cursor-pointer text-center min-h-[250px] bg-gray-50  text-gray-900 focus:ring-blue-500  block  dark:bg-kebab-bg-dm  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500">
              {state.data.map(({ title }, index) => (
                <option
                  key={index}
                  value={index}
                  className="odd:bg-kebab-odd even:bg-kebab-even dark:text-white hover:bg-kebab-dk">
                  {title}
                </option>
              ))}
            </select>
            <div className="text-right text-xs">
              Last Updated: {new Date(state.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })} (UTC)
            </div>
          </>
        )}
      </ContentBlock>

      {state.data && (
        <>
          {state.selected.map((index) => (
            // <TopTenBlock key={index} board={board} index={index} savedTop10Statuses={savedTop10Statuses} />
            <TopTenBlock key={index} board={state.data![index]} state={state} />
          ))}

          {/* {state.data.map((board, index) => (
              // <TopTenBlock key={index} board={board} index={index} savedTop10Statuses={savedTop10Statuses} />
              <TopTenBlock key={index} board={board} index={index} />
            ))} */}
          {/* <ContentBlock>
            <div className="text-center text-xs">
                Last Updated: {new Date(state.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })} (UTC)
            </div>
          </ContentBlock> */}
        </>
      )}
    </>
  );
}
