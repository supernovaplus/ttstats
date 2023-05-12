//https://d3.ttstats.eu/data/topjobs.json
import ContentBlock from '../ContentBlock';
import { useEffect, useState } from 'react';
import { TopJobsHistoryResponse, TopJobsHistoryState } from '../../types/serverTypes';
import { roundFixed, utcDate } from '../../controllers/misc';

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
          setState({ loading: false, data: res.data, error: null, updated_at: res.updated_at });
        }
      })
      .catch((err) => {
        console.error(err);
        if (isSubscribed) {
          setState({ loading: false, data: null, error: 'Failed to load the data', updated_at: 0 });
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const restTop20Month = {
    percentage: 0,
    hours: 0,
  };

  const restTop10TwoDays = {
    percentage: 0,
    hours: 0,
  };

  if (state.data) {
    //month data
    let totalMonthlyPercentage = 0;
    let totalMonthlyHours = 0;
    state.data.top_20_month.forEach(({ percentage, hours }) => {
      totalMonthlyPercentage += percentage;
      totalMonthlyHours += hours;
    });
    restTop20Month.percentage = 100 - totalMonthlyPercentage;
    restTop20Month.hours = totalMonthlyHours * (restTop20Month.percentage / 100);

    //2 days data
    let totalTwoDaysPercentage = 0;
    let totalTwoDaysHours = 0;
    state.data.top_10_two_days.forEach(({ percentage, hours }) => {
      totalTwoDaysPercentage += percentage;
      totalTwoDaysHours += hours;
    });
    restTop10TwoDays.percentage = 100 - totalTwoDaysPercentage;
    restTop10TwoDays.hours = totalTwoDaysHours * (restTop10TwoDays.percentage / 100);
  }

  return (
    <>
      {state.loading && (
        <>
          <ContentBlock>
            <div className="text-center flex justify-center items-center" style={{ height: '386px' }}>
              Loading
            </div>
          </ContentBlock>
          <ContentBlock>
            <div className="text-center flex justify-center items-center" style={{ height: '390px' }}>
              Loading
            </div>
          </ContentBlock>
        </>
      )}
      {state.error && <ContentBlock>Error: {state.error}</ContentBlock>}
      {state.data && (
        <>
          <ContentBlock title="Top 10 Jobs (Last 2 Days)">
            <div className="text-center max-h-[500px] overflow-y-auto">
              <table className="w-full text-center">
                <thead className="sticky top-0 bg-gray-400 dark:bg-kebab-bg-dm">
                  <tr>
                    <th>Place</th>
                    <th>%</th>
                    <th>Job</th>
                    <th>Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {state.data.top_10_two_days.map(({ name, hours, percentage }, index) => (
                    <tr key={index} className="odd:bg-kebab-odd even:bg-kebab-even hover:bg-kebab-dk">
                      <td>#{index + 1}</td>
                      <td>{percentage}%</td>
                      <td>{name}</td>
                      <td>{hours} h</td>
                    </tr>
                  ))}
                  <tr className="text-gray-600 dark:text-gray-400">
                    <td>...</td>
                    <td>{roundFixed(restTop10TwoDays.percentage, 1)}%</td>
                    <td>Other Jobs</td>
                    <td>{Math.round(restTop10TwoDays.hours)} h</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-right text-xs">Updated: {utcDate(state.updated_at)}</div>
          </ContentBlock>
          <ContentBlock title="Top 20 Jobs (Last 30 Days)">
            <div className="text-center max-h-[300px] overflow-y-auto">
              <table className="w-full text-center">
                <thead className="sticky top-0 bg-gray-400 dark:bg-kebab-bg-dm">
                  <tr>
                    <th>Place</th>
                    <th>%</th>
                    <th>Job</th>
                    <th>Hours</th>
                  </tr>
                </thead>
                <tbody>
                  {state.data.top_20_month.map(({ name, hours, percentage }, index) => (
                    <tr key={index} className="odd:bg-kebab-odd even:bg-kebab-even hover:bg-kebab-dk">
                      <td>#{index + 1}</td>
                      <td>{percentage}%</td>
                      <td>{name}</td>
                      <td>{hours} h</td>
                    </tr>
                  ))}
                  <tr className="text-gray-600 dark:text-gray-400">
                    <td>...</td>
                    <td>{roundFixed(restTop20Month.percentage, 1)}%</td>
                    <td>Other Jobs</td>
                    <td>{Math.round(restTop20Month.hours)} h</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-right text-xs mt-2">Updated: {utcDate(state.updated_at)}</div>
          </ContentBlock>
        </>
      )}
    </>
  );
}
