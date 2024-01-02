import React, { useState, useEffect } from 'react';
import ContentBlock from '../components/ContentBlock';
import { TimeUpdatedRow, LoadingRow, ErrorRow } from '../components/MiscComponents';
import { shortenLargeMoney } from '../controllers/misc';

export default function DealershipPage() {
  const [state, setState] = useState<any>({
    loading: true,
    error: null,
    data: null,
    updated_at: null,
  });

  useEffect(() => {
    let isSubscribed = true;

    fetch('https://d3.ttstats.eu/data/dealership.json')
      .then((res) => res.json())
      .then((res: any) => {
        if (!res || !res.data || typeof res.data !== 'object') throw new Error('no data received');

        if (isSubscribed) {
          setState((s: any) => ({
            ...s,
            loading: false,
            error: null,
            data: res.data,
            updated_at: res.updated_at,
            isHidden: Object.fromEntries(Object.keys(res.data).map((category) => [category, true])),
          }));
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err);
          setState((s: any) => ({
            ...s,
            loading: false,
            error: 'Failed to load the data, try again later.',
            updated_at: 0,
            data: null,
          }));
        }
      });

    return () => {
      isSubscribed = false;
    };
  }, []);

  const onChangeVisibility = (category: string) => {
    setState((s: any) => {
      s.isHidden[category] = !s.isHidden[category];
      return { ...s };
    });
  };

  const onToggleAll = () => {
    setState((s: any) => {
      const isFirstHidden = Object.values(s.isHidden)[0];
      for (const category in s.isHidden) {
        s.isHidden[category] = !isFirstHidden;
      }
      return { ...s };
    });
  };

  return (
    <>
      <ContentBlock title="Dealership">
        {state.loading && <LoadingRow />}
        {state.error && <ErrorRow>{state.error}</ErrorRow>}
        {state.data && (
          <>
            <div className=" mb-1 rounded-sm w-full text-center">
              <div className="cursor-pointer bg-gray-700 text-white p-1 text-sm inline-block hover:underline" onClick={onToggleAll}>
                Show/Hide All
              </div>
            </div>
            {Object.entries(state.data).map(([category, vehicles], index) => (
              <div key={index} className="text-white">
                <div className=" border-white mb-1 rounded-sm">
                  <div
                    className="w-full cursor-pointer hover:bg-gray-500 p-2 bg-gray-700"
                    onClick={() => onChangeVisibility(category)}>
                    {category}
                  </div>
                  {!state.isHidden[category] && (
                    <div
                      hidden={state.isHidden[category]}
                      className="flex flex-wrap gap-2 pt-2 justify-center">
                      {(vehicles as any).map(({ name, model, price }, index) => (
                        <div key={index} className="w-full max-w-[235px] p-1 text-center bg-gray-600">
                          <a
                            href={`https://cdn.tycoon.community/dealership/vehicles/${model}.png`}
                            target="_blank"
                            title={model}>
                            <img
                              src={`https://cdn.tycoon.community/dealership/vehicles/${model}.png`}
                              alt="(no image)"
                              loading="lazy"
                              className="block mb-2 w-full"
                            />
                          </a>

                          <p>{name}</p>
                          <p>${shortenLargeMoney(price)}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            <TimeUpdatedRow updated_at={state.updated_at * 1000} />
          </>
        )}
      </ContentBlock>
    </>
  );
}
