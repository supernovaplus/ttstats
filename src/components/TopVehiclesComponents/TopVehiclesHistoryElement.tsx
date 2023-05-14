import ContentBlock from '../ContentBlock';
import { TopVehiclesHistoryState } from '../../types/serverTypes';
import { roundFixed } from '../../controllers/misc';
import { TimeUpdatedRow, ErrorRow } from '../MiscComponents';

type props = {
  state: TopVehiclesHistoryState;
  dataKey: string;
  title: string;
};

export default function TopVehiclesHistoryElement({ state, title, dataKey }: props) {
  const calculations = {
    percentage: 0,
    hours: 0,
  };

  let totalPercentage = 0;
  let totalHours = 0;

  let dataExists =
    !state.loading &&
    state.data &&
    Object.prototype.hasOwnProperty.call(state.data, dataKey) &&
    Array.isArray(state.data[dataKey]);

  if (dataExists) {
    state.data![dataKey].forEach(({ percentage, hours }) => {
      totalPercentage += percentage;
      totalHours += hours;
    });
    calculations.percentage = 100 - totalPercentage;
    calculations.hours = totalHours * (calculations.percentage / 100);
  }

  return (
    <ContentBlock title={title}>
      {state.loading && (
        <div className="text-center flex justify-center items-center" style={{ height: '386px' }}>
          Loading
        </div>
      )}
      {state.error && <ErrorRow>{state.error}</ErrorRow>}
      {dataExists && (
        <>
          <div className="text-center max-h-[300px] overflow-y-auto">
            <table className="w-full text-center">
              <thead className="sticky top-0 bg-gray-400 dark:bg-kebab-bg-dm">
                <tr>
                  <th>Place</th>
                  <th>%</th>
                  <th>Vehicle</th>
                  <th>Hours</th>
                </tr>
              </thead>
              <tbody>
                {state.data![dataKey].map(({ name, hours, percentage }, index) => (
                  <tr key={index} className="odd:bg-kebab-odd even:bg-kebab-even hover:bg-kebab-dk">
                    <td>#{index + 1}</td>
                    <td>{percentage}%</td>
                    <td>{name}</td>
                    <td>{hours.toLocaleString('en-us')} h</td>
                  </tr>
                ))}
                <tr className="text-gray-600 dark:text-gray-400 odd:bg-kebab-odd even:bg-kebab-even hover:bg-kebab-dk">
                  <td>...</td>
                  <td>{roundFixed(calculations.percentage, 1)}%</td>
                  <td>Other Vehicles</td>
                  <td>{Math.round(calculations.hours).toLocaleString('en-us')} h</td>
                </tr>
              </tbody>
            </table>
          </div>
          <TimeUpdatedRow updated_at={state.updated_at} />
        </>
      )}
    </ContentBlock>
  );
}
