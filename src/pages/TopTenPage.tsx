import React, { useState, useEffect } from 'react';
import { TopTenData, TopTenDataState, TopTenDataResponse } from '../types/serverTypes';
import ContentBlock from '../components/ContentBlock';

interface TopTenBlockProps {
  board: TopTenData;
  index: number;
}

function TopTenBlock({ board, index }: TopTenBlockProps) {
  console.log(index);
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
          {board.rows.map((row, index2) => (
            <tr key={index2} title={`Player ID: ${String(row[0])}`}>
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
  });

  //   const savedTop10Statuses =
  // state.loading === false && localStorage.getItem('top10') ? JSON.parse(localStorage.getItem('top10')) : {};

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isSubscribed = true;
    fetch('https://api.transporttycoon.eu/top10.json', { signal })
      .then((res) => res.json())
      .then((res: TopTenDataResponse) => {
        if (isSubscribed) {
          setState({
            loading: false,
            error: null,
            data: res.data,
            timestamp: res.timestamp,
          });
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err);
          setState({
            loading: false,
            error: 'Failed to load the data, try again later.',
            data: null,
            timestamp: 0,
          });
        }
      });
    return () => {
      controller.abort();
      isSubscribed = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!state.loading && state.data && !state.data.length) {
    setState({
      loading: false,
      error: 'Failed to load the data, try again later.',
      data: null,
      timestamp: 0,
    });
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
      </ContentBlock>
      {state.data && (
        <>
          {state.data.map((board, index) => (
            // <TopTenBlock key={index} board={board} index={index} savedTop10Statuses={savedTop10Statuses} />
            <TopTenBlock key={index} board={board} index={index} />
          ))}
          <ContentBlock>
            <div className="text-center">
              <div>Leaderboards updates every hour</div>
              <div>
                Last Updated: {new Date(state.timestamp).toLocaleString('en-GB', { timeZone: 'UTC' })} (UTC)
              </div>
            </div>
          </ContentBlock>
        </>
      )}
    </>
  );
}