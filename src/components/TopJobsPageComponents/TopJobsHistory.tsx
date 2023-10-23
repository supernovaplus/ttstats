import ContentBlock from '../ContentBlock';
import { useEffect, useState } from 'react';
import { TopJobsHistoryResponse, TopJobsHistoryState } from '../../types/serverTypes';
import TopJobHistoryElement from './TopJobHistoryElement';

export default function TopJobsHistory() {
  const [state, setState] = useState<TopJobsHistoryState>({
    loading: true,
    data: null,
    error: null,
    updated_at: 0,
  });

  useEffect(() => {
    let isSubscribed = true;

    fetch('https://d3.ttstats.eu/data/topjobs.json')
      .then((res) => res.json())
      .then((res: TopJobsHistoryResponse) => {
        if (isSubscribed) {
          if (!res || !res.data || typeof res.data !== 'object') throw new Error('No data');
          setState({ loading: false, data: res.data, error: null, updated_at: res.updated_at || 0 });
        }
      })
      .catch((err) => {
        console.error(err);
        if (isSubscribed) {
          setState({ loading: false, data: null, error: 'Loading data failed, try again later.', updated_at: 0 });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <TopJobHistoryElement state={state} dataKey="twodays" title="Top 10 Jobs (Last 2 Days) [Legacy Server Only]" />
      <TopJobHistoryElement state={state} dataKey="monthly" title="Top 20 Jobs (Last 30 Days) [Legacy Server Only]" />
      {/* <TopJobHistoryElement state={state} dataKey="year" title="Top 30 Jobs (Last 365 days)" /> */}
    </>
  );
}
