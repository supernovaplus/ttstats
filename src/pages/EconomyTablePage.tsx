import React, { useEffect, useState, ChangeEventHandler } from 'react';
import ContentBlock from '../components/ContentBlock';
import { EconomyTableState, EconomyResponse } from '../types/serverTypes';
import { shortenLargeMoney } from '../controllers/misc';
import { utcDate } from '../controllers/misc';
import { TimeUpdatedDiffRow, ErrorRow } from '../components/MiscComponents';
import { LoadingRow } from '../components/MiscComponents';
import { bucketUri } from '../data/config';

const DifferenceTab = ({ value, shorten = false }: { value: number; shorten?: boolean }) => {
  if (value > 0) {
    return (
      <div className="text-green-800 dark:text-green-500 text-right inline-block flex-grow-0">
        +{shorten ? shortenLargeMoney(value) : value}
      </div>
    );
  } else if (value < 0) {
    return (
      <div className="text-red-800 dark:text-red-500 text-right inline-block flex-grow-0">
        {shorten ? shortenLargeMoney(value) : value}
      </div>
    );
  } else {
    return <>-</>;
  }
};

const ECONOMYLINKS = [
  ['Wipe 2.0 (current)', `${bucketUri}/data/economy3-reversed.json`],
  ['Wipe 1.0 (No longer updated)', `${bucketUri}/data/economy2-reversed.json`],
  ['Legacy (No longer updated)', `${bucketUri}/data/economy-reversed.json`],
];

const initalState: EconomyTableState = {
  loading: true,
  data: null,
  error: null,
  selectedServer: 0,
};

export default function EconomyTablePage() {
  const [state, setState] = useState<EconomyTableState>(initalState);

  const changeServer: ChangeEventHandler<HTMLSelectElement> = (e) => {
    setState((s) => ({
      ...initalState,
      selectedServer: parseInt(e.target.value),
    }));
  };

  useEffect(() => {
    let isSubscribed = true;
    fetch(ECONOMYLINKS[state.selectedServer][1])
      .then((res) => res.json())
      .then((res: EconomyResponse) => {
        if (!res || !Array.isArray(res.data)) throw new Error('Invalid Data');

        if (isSubscribed) {
          setState((s) => ({
            ...s,
            loading: false,
            data: res,
          }));
        }
      })
      .catch(() => {
        if (isSubscribed) {
          setState((s) => ({
            ...s,
            loading: false,
            error: 'Loading data failed, try again later.',
          }));
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, [state.selectedServer]);

  // Time;Debt;Money;Debts;Millionaires;Billionaires;Users;Players

  return (
    <ContentBlock title="Economy">
      <div className="flex p-1">
        <div className="p-1">Server: </div>
        <select
          className="p-0 m-0 ml-1 block w-full my-1 cursor-pointer text-center bg-gray-600 border border-gray-600 text-white"
          defaultValue={'0'}
          onChange={changeServer}>
          {ECONOMYLINKS.map(([name, link], index) => (
            <option key={index} value={index} className="text-center p-2">
              {name}
            </option>
          ))}
        </select>
      </div>
      {state.loading && <LoadingRow />}
      {state.error && <ErrorRow>{state.error}</ErrorRow>}
      {state.data && state.data.data && (
        <>
          <div className="max-h-[600px] overflow-auto border-b-2 border-nova-c1 dark:border-nova-c3 box-shadow-1">
            <table className="text-center w-full text-sm min-w-full lg:resp-table">
              <thead className="sticky top-0 text-white bg-nova-c1 dark:bg-nova-c3 text-center">
                <tr>
                  <th>Date</th>
                  <th colSpan={2}>Debt</th>
                  <th colSpan={2}>Money</th>
                  <th colSpan={2}>Debts</th>
                  <th colSpan={2}>Millionaires</th>
                  <th colSpan={2}>Billionaires</th>
                  <th colSpan={2}>Users</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {state.data.data.map((row, index) => {
                  const nextRow = state.data!.data.length === index ? null : state.data!.data[index + 1];
                  const debtChange = nextRow ? row.debt - nextRow.debt : 0;
                  const moneyChange = nextRow ? row.money - nextRow.money : 0;
                  const debtsChange = nextRow ? row.debts - nextRow.debts : 0;
                  const milChange = nextRow ? row.mil - nextRow.mil : 0;
                  const bilChange = nextRow ? row.bil - nextRow.bil : 0;
                  const usersChange = nextRow ? row.users - nextRow.users : 0;

                  return (
                    <tr key={index} className="odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk">
                      <td data-label="Date" className="px-1" title={new Date(row.date).toUTCString()}>
                        {utcDate(row.date, true)}
                      </td>
                      <td data-label="Debt" className="text-right">
                        ${shortenLargeMoney(row.debt)}
                      </td>
                      <td className="text-left">
                        <DifferenceTab value={debtChange} shorten={true} />
                      </td>
                      <td data-label="Money" className="text-right">
                        {shortenLargeMoney(row.money)}
                      </td>
                      <td className="text-left">
                        <DifferenceTab value={moneyChange} shorten={true} />
                      </td>
                      <td data-label="Debts" className="text-right">
                        {row.debts.toLocaleString('en-us')}
                      </td>
                      <td className="text-left">
                        <DifferenceTab value={debtsChange} />
                      </td>
                      <td data-label="Millionaires" className="text-right">
                        {row.mil.toLocaleString('en-us')}
                      </td>
                      <td className="text-left">
                        <DifferenceTab value={milChange} />
                      </td>
                      <td data-label="Billionaires" className="text-right">
                        <span className="inline-block flex-grow-0">{row.bil.toLocaleString('en-us')}</span>
                      </td>
                      <td className="text-left">
                        <DifferenceTab value={bilChange} />
                      </td>
                      <td data-label="Users" className="text-right">
                        <span className="inline-block flex-grow-0">{row.users.toLocaleString('en-us')}</span>
                      </td>
                      <td className="text-left">
                        <DifferenceTab value={usersChange} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <TimeUpdatedDiffRow fromTime={state.data.updated_at} />
        </>
      )}
    </ContentBlock>
  );
}
