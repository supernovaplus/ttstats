import React, { useEffect, useState } from 'react';
import ContentBlock from '../components/ContentBlock';
import { EconomyTableState, EconomyResponse } from '../types/serverTypes';
import { shortenLargeMoney } from '../controllers/misc';

export default function EconomyTablePage() {
  const [state, setState] = useState<EconomyTableState>({
    loading: true,
    data: null,
    error: null,
  });

  useEffect(() => {
    fetch('https://d3.ttstats.eu/data/economy-reverse.json')
      .then((res) => res.json())
      .then((res: EconomyResponse[]) => {
        setState((s) => ({
          ...s,
          loading: false,
          data: res,
        }));
      })
      .catch(() => {
        setState((s) => ({
          ...s,
          loading: false,
          error: 'Failed to load the economy data',
        }));
      });
  }, []);

  // Time;Debt;Money;Debts;Millionaires;Billionaires;Users;Players

  return (
    <ContentBlock title="Economy">
      {state.loading && <div>Loading...</div>}
      {state.error && <div>{'Error - ' + state.error}</div>}
      {state.data && (
        <div>
          <table className="text-center w-full text-sm">
            <thead>
              <th>Date</th>
              <th>Debt</th>
              <th>Money</th>
              <th>Debts</th>
              <th>Millionaires</th>
              <th>Billionaires</th>
              <th>Users</th>
            </thead>
            <tbody>
              {state.data.map((row, index) => {
                const nextRow = state.data!.length === index ? null : state.data![index + 1];

                return (
                  <tr>
                    <td>
                      {new Date(row.date).toLocaleString('en-GB', {
                        timeZone: 'UTC',
                        weekday: undefined,
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                        hour12: false,
                      })}
                    </td>
                    <td>
                      ${shortenLargeMoney(row.debt)} (
                      {shortenLargeMoney(nextRow ? row.debt - nextRow.debt : 0)})
                    </td>
                    <td>
                      {shortenLargeMoney(row.money)} (
                      {shortenLargeMoney(nextRow ? row.money - nextRow.money : 0)})
                    </td>
                    <td>
                      {row.debts.toLocaleString('en-us')} ({nextRow ? row.debts - nextRow.debts : 0})
                    </td>
                    <td>
                      {row.mil.toLocaleString('en-us')} ({nextRow ? row.mil - nextRow.mil : 0})
                    </td>
                    <td>
                      {row.bil.toLocaleString('en-us')} ({nextRow ? row.bil - nextRow.bil : 0})
                    </td>
                    <td>
                      {row.users.toLocaleString('en-us')} ({nextRow ? row.users - nextRow.users : 0})
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </ContentBlock>
  );
}
