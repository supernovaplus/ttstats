import React, { useEffect, useState } from 'react';
import { VehicleClasses } from '../../data/vehicleData';
import { TopVehicleData, TopVehicleDataState } from '../../types/serverTypes';
import ContentBlock from '../../components/ContentBlock';
import { ErrorRow, TimeUpdatedRow, LoadingRow } from '../MiscComponents';

export default function TopVehiclesLive() {
  const [state, setState] = useState<TopVehicleDataState>({
    loading: true,
    error: null,
    timestamp: 0,
    total_vehicles: 0,
    total_classes: 0,
    sorted_vehicles: null,
    sorted_classes: null,
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;
    let isSubscribed = true;

    fetch('https://d.ttstats.eu/vehicles', { signal })
      .then((res) => res.json())
      .then((res: TopVehicleData) => {
        if (
          !res ||
          !res.timestamp ||
          !Object.prototype.hasOwnProperty.call(res, 'sorted_classes') ||
          !Object.prototype.hasOwnProperty.call(res, 'sorted_vehicles')
        )
          throw new Error('No data');
        if (isSubscribed) {
          setState((s) => ({
            ...s,
            error: null,
            timestamp: res.timestamp,
            total_vehicles: res.sorted_vehicles!.reduce((acc, v) => acc + v[1], 0),
            total_classes: res.sorted_classes!.reduce((acc, v) => acc + v[1], 0),
            sorted_vehicles: res.sorted_vehicles,
            sorted_classes: res.sorted_classes,
            loading: false,
          }));
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err);
          setState((s) => ({ ...s, error: 'Loading data failed, try again later.', loading: false }));
        }
      });
    return () => {
      controller.abort();
      isSubscribed = false;
    };
  }, []);

  return (
    <>
      <ContentBlock title="Top Vehicles Now [Legacy Server Only]">
        <div className="max-h-[300px] overflow-y-auto border-b-2 border-nova-c1 dark:border-nova-c3 box-shadow-1">
          {state.loading ? (
            <div className="text-center">Loading...</div>
          ) : state.error ? (
            <ErrorRow>{state.error}</ErrorRow>
          ) : (
            <table className="w-full text-center">
              <thead className="sticky top-0 text-white bg-nova-c1  dark:bg-nova-c3">
                <tr>
                  <th>%</th>
                  <th>Name</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {!state.sorted_vehicles || !state.sorted_vehicles.length ? (
                  <tr className="text-gray-600 dark:text-gray-400 odd:bg-kebab-odd even:bg-kebab-even hover:bg-kebab-dk">
                    <td>-</td>
                    <td>No Data</td>
                    <td>-</td>
                  </tr>
                ) : (
                  <>
                    {state.sorted_vehicles.map((veh, index) => {
                      return (
                        <tr key={index} className="odd:bg-kebab-odd even:bg-kebab-even hover:bg-kebab-dk">
                          <td data-label="%">{Number((veh[1] / state.total_vehicles) * 100).toFixed(2)}%</td>
                          <td data-label="Name">{veh[0]}</td>
                          <td data-label="Active">{veh[1]}</td>
                        </tr>
                      );
                    })}
                  </>
                )}
              </tbody>
            </table>
          )}
        </div>
        <TimeUpdatedRow updated_at={state.timestamp} />
      </ContentBlock>
      <ContentBlock title="Top Vehicle Classes Now [Legacy Server Only]">
        <div className="max-h-[300px] overflow-y-auto border-b-2 border-nova-c1 dark:border-nova-c3 box-shadow-1">
          {state.loading ? (
            <div className="text-center">Loading...</div>
          ) : state.error ? (
            <ErrorRow>{state.error}</ErrorRow>
          ) : (
            <table className="w-full text-center">
              <thead className="sticky top-0 text-white bg-nova-c1  dark:bg-nova-c3">
                <tr>
                  <th>%</th>
                  <th>Name</th>
                  <th>Active</th>
                </tr>
              </thead>
              <tbody>
                {!state.sorted_classes || !state.sorted_classes.length ? (
                  <tr className="text-gray-600 dark:text-gray-400 odd:bg-kebab-odd even:bg-kebab-even hover:bg-kebab-dk">
                    <td>-</td>
                    <td>No Data</td>
                    <td>-</td>
                  </tr>
                ) : (
                  <>
                    {state.sorted_classes.map((veh, index) => (
                      <tr key={index} className="odd:bg-kebab-odd even:bg-kebab-even hover:bg-kebab-dk">
                        <td data-label="%">{Number((veh[1] / state.total_vehicles) * 100).toFixed(2)}%</td>
                        <td data-label="Name">
                          {veh[0] === -1 ? 'On Foot' : VehicleClasses[Math.round(veh[0])] || '?'}
                        </td>
                        <td data-label="Active">{veh[1]}</td>
                      </tr>
                    ))}
                  </>
                )}
              </tbody>
            </table>
          )}
        </div>
        <TimeUpdatedRow updated_at={state.timestamp} />
      </ContentBlock>
    </>
  );
}
