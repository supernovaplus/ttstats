import React, { useEffect, useState } from 'react';
import ContentBlock from '../components/ContentBlock';
import { EconomyTableState, EconomyResponse } from '../types/serverTypes';
import { shortenLargeMoney } from '../controllers/misc';

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

export default function EconomyTablePage() {
  const [state, setState] = useState<EconomyTableState>({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    let isSubscribed = true;
    fetch('https://d3.ttstats.eu/data/economy-reversed.json')
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
            error: 'Failed to load the economy data',
          }));
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  // Time;Debt;Money;Debts;Millionaires;Billionaires;Users;Players

  return (
    <ContentBlock title="Economy">
      {state.loading && <div>Loading...</div>}
      {state.error && <div>{'Error - ' + state.error}</div>}
      {state.data && state.data.data && (
        <div>
          <div className="max-h-[600px] overflow-auto">
            <table className="text-center w-full text-sm dyntable min-w-full">
              <thead>
                {/* <thead className="sticky top-0 bg-gray-400 dark:bg-kebab-bg-dm text-center"> */}
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
                      <td data-label="Date" className="px-1">
                        {new Date(row.date).toLocaleString('en-GB', {
                          timeZone: 'UTC',
                          weekday: undefined,
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour12: false,
                        })}
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
          <div className="text-right text-xs mt-4">
            Updated:{' '}
            {new Date(state.data.updated_at)
              .toLocaleString('en-GB', {
                timeZone: 'UTC',
                weekday: undefined,
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: false,
              })
              .replace(' at', ',') + ' (UTC)'}
          </div>
        </div>
      )}
    </ContentBlock>
  );
}
