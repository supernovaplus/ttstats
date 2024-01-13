import React, { useState, useEffect } from 'react';
import ContentBlock from '../components/ContentBlock';
import { TimeUpdatedDiffRow, LoadingRow, ErrorRow } from '../components/MiscComponents';
import { prettyNum, shortenLargeMoney } from '../controllers/misc';

interface DealershipResponseJsonInterface {
  updated_at: number;
  data: {
    [category: string]: {
      model: string;
      name: string;
      price: number;
    }[];
  };
  requirements: {
    [key: string]: string;
  };
}

interface DealershipStateInterface {
  loading: boolean;
  error: null | string;
  data: null | DealershipResponseJsonInterface['data'];
  updated_at: null | number;
  requirements: null | DealershipResponseJsonInterface['requirements'];
  isHidden: null | { [key: string]: boolean };
}

export default function DealershipPage() {
  const [state, setState] = useState<DealershipStateInterface>({
    loading: true,
    error: null,
    data: null,
    updated_at: null,
    requirements: null,
    isHidden: null,
  });

  //TODO: types
  useEffect(() => {
    let isSubscribed = true;

    fetch('https://d3.ttstats.eu/data/dealership.json')
      .then((res) => res.json())
      .then((res: DealershipResponseJsonInterface) => {
        if (!res || !res.data || typeof res.data !== 'object') throw new Error('no data received');

        if (isSubscribed) {
          for (const category in res.data) {
            res.data[category] = res.data[category].sort((a, b) => a.name.localeCompare(b.name));
          }
          setState((s) => ({
            ...s,
            loading: false,
            error: null,
            data: res.data,
            updated_at: res.updated_at,
            requirements: res.requirements || null,
            isHidden: Object.fromEntries(Object.keys(res.data).map((category) => [category, false])),
          }));
        }
      })
      .catch((err) => {
        if (isSubscribed) {
          console.log(err);
          setState((s) => ({
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
    setState((s) => {
      if (!s.isHidden) return s;
      s.isHidden[category] = !s.isHidden[category];
      return { ...s };
    });
  };

  const onToggleAll = () => {
    setState((s) => {
      const isFirstHidden = s.isHidden === null ? false : Object.values(s.isHidden)[0];
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

  console.log(state);

  return (
    <>
      <ContentBlock title="Dealership">
        {state.loading && <LoadingRow />}
        {state.error && <ErrorRow>{state.error}</ErrorRow>}
        {state.data && (
          <>
            <div className="mb-1 rounded-sm w-full text-center">
              <div
                className="cursor-pointer bg-gray-700 text-white p-1 text-sm inline-block hover:underline rounded-sm"
                onClick={onToggleAll}>
                Show/Hide All
              </div>
            </div>
            {Object.entries(state.data).map(([category, vehicles], index) => (
              <div key={index} className="text-white text-center">
                {/* {index !== 0 && <hr className="mb-2 p-0 h-0 border border-b-black" />} */}
                <div className="border-white mb-1 rounded-sm">
                  <div
                    className="w-full cursor-pointer hover:bg-gray-500 p-2 bg-gray-700 select-none rounded-sm border border-transparent"
                    onClick={() => onChangeVisibility(category)}>
                    {category} ({state.data && state.data[category].length})
                  </div>
                  {state.isHidden && !state.isHidden[category] && (
                    <div
                      hidden={state.isHidden[category]}
                      className="flex flex-wrap gap-2 pt-2 mb-2 justify-center">
                      {vehicles.map(({ name, model, price }, index: number) => (
                        <div key={index} className="w-full max-w-[250px] text-center">
                          <div className="bg-slate-500 box-shadow-1  border border-transparent rounded-sm overflow-hidden">
                            <a
                              href={`https://cdn.tycoon.community/dealership/vehicles/${model}.png`}
                              target="_blank"
                              title={model}>
                              <img
                                src={`https://cdn.tycoon.community/dealership/vehicles/${model}.png`}
                                alt=""
                                loading="lazy"
                                className="block w-full object-cover overflow-hidden"
                                style={{ height: '150px' }}
                                onError={onImageErr}
                              />
                            </a>
                            <div className="w-full flex bg-slate-600 items-start p-[2px]">
                              <div className="block text-center w-full">
                                <div className="text px-1 inline-block">{name}</div>
                              </div>
                              <div className="block bg-gray-700 inset-shadow-1 rounded-sm">
                                <div className="text px-3" title={`$${prettyNum(price)}`}>
                                  ${shortenLargeMoney(price)}
                                </div>
                              </div>
                            </div>
                            {state.requirements?.hasOwnProperty(model) ? (
                              <div className="block bg-gray-800 inset-shadow-1 rounded-sm">
                                <div className="text-xs p-px">{state.requirements[model]} required</div>
                              </div>
                            ) : <></>}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {state.updated_at && <TimeUpdatedDiffRow fromTime={state.updated_at * 1000} />}
          </>
        )}
      </ContentBlock>
    </>
  );
}
