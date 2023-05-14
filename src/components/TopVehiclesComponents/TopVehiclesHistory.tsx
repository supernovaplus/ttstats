import ContentBlock from '../ContentBlock';
import { useEffect, useState } from 'react';
import { TopVehiclesHistoryResponse, TopVehiclesHistoryState } from '../../types/serverTypes';
import TopVehiclesHistoryElement from './TopVehiclesHistoryElement';

export default function TopVehiclesHistory() {
  const [state, setState] = useState<TopVehiclesHistoryState>({
    loading: true,
    data: null,
    error: null,
    updated_at: 0,
  });

  useEffect(() => {
    let isSubscribed = true;

    fetch('https://d3.ttstats.eu/data/topvehicles.json')
      .then((res) => res.json())
      .then((res: TopVehiclesHistoryResponse) => {
        if (isSubscribed) {
          if (!res || !res.data || typeof res.data !== 'object') throw new Error('No data');
          setState({ loading: false, data: res.data, error: null, updated_at: res.updated_at });
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
      <TopVehiclesHistoryElement state={state} title="Top 30 Vehicles (Last 2 Days)" dataKey="twodays" />
      <TopVehiclesHistoryElement state={state} title="Top 30 Vehicles (Last 30 Days)" dataKey="monthly" />
    </>
  );
}
