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

  //TODO: types
  useEffect(() => {
    let isSubscribed = true;

    fetch('https://d3.ttstats.eu/data/dealership.json')
      .then((res) => res.json())
      .then((res: any) => {
        if (!res || !res.data || typeof res.data !== 'object') throw new Error('no data received');

        if (isSubscribed) {
          for (const category in res.data) {
            res.data[category] = res.data[category].sort((a: any, b: any) => a.name.localeCompare(b.name));
          }
          setState((s: any) => ({
            ...s,
            loading: false,
            error: null,
            data: res.data,
            updated_at: res.updated_at,
            isHidden: Object.fromEntries(Object.keys(res.data).map((category) => [category, false])),
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

  const onImageErr = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.alt = '(No Image)';
    e.currentTarget.style.maxHeight = '30px';
    e.currentTarget.style.minHeight = '0';
  };

  return (
    <>
      <ContentBlock title="Dealership">
        {state.loading && <LoadingRow />}
        {state.error && <ErrorRow>{state.error}</ErrorRow>}
        {state.data && (
          <>
            <div className=" mb-1 rounded-sm w-full text-center">
              <div
                className="cursor-pointer bg-gray-700 text-white p-1 text-sm inline-block hover:underline"
                onClick={onToggleAll}>
                Show/Hide All
              </div>
            </div>
            {Object.entries(state.data).map(([category, vehicles], index) => (
              <div key={index} className="text-white text-center">
                <div className=" border-white mb-1 rounded-sm">
                  <div
                    className="w-full cursor-pointer hover:bg-gray-500 p-2 bg-gray-700 select-none"
                    onClick={() => onChangeVisibility(category)}>
                    {category} ({state.data[category].length})
                  </div>
                  {!state.isHidden[category] && (
                    <div
                      hidden={state.isHidden[category]}
                      className="flex flex-wrap gap-2 pt-2 mb-2 justify-center">
                      {(vehicles as any).map(
                        (
                          {
                            name,
                            model,
                            price,
                            req,
                          }: { name: string; model: string; price: number; req: string | null },
                          index: number
                        ) => (
                          <div key={index} className="w-full max-w-[250px] text-center">
                            <div className=" justify-end">
                              <div className='min-h-[150px] flex flex-col  justify-end'>
                                <a
                                  href={`https://cdn.tycoon.community/dealership/vehicles/${model}.png`}
                                  target="_blank"
                                  title={model}>
                                  <img
                                    src={`https://cdn.tycoon.community/dealership/vehicles/${model}.png`}
                                    alt=""
                                    loading="lazy"
                                    className="block w-full"
                                    style={{ minHeight: '120px' }}
                                    onError={onImageErr}
                                  />
                                </a>
                              </div>
                              <div className="flex w-full">
                                <div className="block border-gray-500 text-center bg-slate-500 w-full">
                                  <div className="text-xs w-full bg-gray-700 px-1">Name:</div>
                                  <div className="text px-1">{name}</div>
                                </div>
                                <div className="block border-gray-700 border-l bg-gray-700">
                                  <div className="text-xs w-full bg-gray-800 px-1">Price:</div>
                                  <div className="text px-1">${shortenLargeMoney(price)}</div>
                                </div>
                              </div>
                              {req && (
                                <div className="block border-gray-500 w-full bg-slate-500">
                                  <div className="text-xs text-center w-full bg-gray-700 px-1">
                                    Requirement:
                                  </div>
                                  <div className="text-xs px-1 bg-red-500 text-black text-shadow-none">
                                    {req}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        )
                      )}
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
