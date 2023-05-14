import React, { useState, useEffect } from 'react';
import { useDataContext } from '../store/DataContext';
import { PlayerFoundList, PlayerFoundState } from '../types/serverTypes';
import ContentBlock from '../components/ContentBlock';
import { generateJoinLink } from '../controllers/misc';

type InputTargetValue = { target: { value: string } };

export default function PlayerFinderPage() {
  const { servers } = useDataContext();
  let jobselectURL, serverSelectURL;

  for (const [key, value] of new URLSearchParams(window.location.search)) {
    if (key === 'job') {
      jobselectURL = value;
    } else if (key === 'server') {
      // serverSelectURL = value;
    }
  }

  const [state, setState] = useState<PlayerFoundState>({
    playerFinderMessages: '',
    playerFinderInputField: '',
    playerFinderFound: [],
    serverSelect: serverSelectURL || 'All Servers',
    jobSelect: jobselectURL || 'All Jobs',
  });

  const [jobList, setJobList] = useState<string[]>([]);

  const handlePlayersNameInput = ({ target: { value } }: InputTargetValue) => {
    setState((s) => ({ ...s, playerFinderInputField: value }));
  };

  const handleServerSelect = ({ target: { value } }: InputTargetValue) => {
    setState((s) => ({ ...s, serverSelect: value }));
  };

  const handleJobSelect = ({ target: { value } }: InputTargetValue) => {
    setState((s) => ({ ...s, jobSelect: value }));
  };

  const handleOnKeyDownEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handlePlayerFinderSubmit();
    }
  };

  const handlePlayerFinderSubmit = (isButton = true) => {
    const input = state.playerFinderInputField.toLowerCase();
    const playerFinderFound: PlayerFoundList[] = [];

    for (const key in servers) {
      if (servers[key].playersData === null) continue;
      servers[key].playersData!.forEach((player) => {
        const playerNameWithId = player[0] + '#' + player[2];
        if (
          playerNameWithId.toLowerCase().includes(input) &&
          (state.serverSelect === 'All Servers' || state.serverSelect === servers[key].name) &&
          (state.jobSelect === 'All Jobs' || state.jobSelect === player[5])
        ) {
          playerFinderFound.push({
            playerNameWithId,
            server: servers[key],
            player,
          });
        }
      });
    }

    // const playerFinderFound = store.state.servers.reduce((acc, server) =>
    // [...(server.playersData || []).filter(player =>
    //     (player[0]+"#"+player[2]).toLowerCase().includes(input) &&
    //     state.serverSelect === "All Servers" || state.serverSelect === server.name &&
    //     (state.jobSelect === "All Jobs" || state.jobSelect === player[5])
    // ), ...acc]
    // , []);

    setState((s) =>
      playerFinderFound.length > 0
        ? {
            ...s,
            playerFinderMessages:
              'Found ' + playerFinderFound.length + ' player' + (playerFinderFound.length === 1 ? '' : 's'),
            playerFinderFound,
          }
        : {
            ...s,
            playerFinderMessages: isButton ? 'Found nothing' : '...',
            playerFinderFound: [],
          }
    );
  };

  useEffect(() => {
    const tempJobsList: string[] = [];
    for (const key in servers) {
      if (!servers[key].loaded || !servers[key].playersData) continue;
      servers[key].playersData!.forEach((player) => {
        if (!tempJobsList.includes(player[5])) {
          tempJobsList.push(player[5]);
        }
      });
    }

    setJobList(tempJobsList);
    handlePlayerFinderSubmit(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [servers]);

  return (
    <ContentBlock title="Online Player Finder">
      <form className="w-full flex flex-col">
        <div>
          <label htmlFor="playerNameSelector">Filter Name Or ID</label>
          <input
            type="text"
            id="playerNameSelector"
            placeholder="Enter player's name or in-game ID here..."
            onChange={handlePlayersNameInput}
            onKeyDown={handleOnKeyDownEnter}
            className="block w-full p-1 my-1 text-black"
          />
        </div>
        <div>
          <label htmlFor="serverSelector">Filter Server</label>
          <select
            id="serverSelector"
            onChange={handleServerSelect}
            value={state.serverSelect}
            className="block w-full p-1 my-1 bg-white cursor-pointer text-black border-5">
            <option
              value="All Servers"
              className="cursor-pointer text-white py-5 dark:bg-kebab-bg-dm border-5">
              All Servers
            </option>
            {Object.values(servers).map((server, index) =>
              server.loaded ? (
                <option
                  key={index}
                  value={server.name}
                  className="cursor-pointer text-white py-5 dark:bg-kebab-bg-dm border-5">
                  {server.name}
                </option>
              ) : (
                ''
              )
            )}
          </select>

          <label htmlFor="jobSelector">Filter Job</label>
          <select
            id="jobSelector"
            onChange={(input) => handleJobSelect(input)}
            value={state.jobSelect}
            className="block w-full p-1 my-1 bg-white cursor-pointer text-black">
            <option value="All Jobs" className="cursor-pointer text-white py-5 dark:bg-kebab-bg-dm">
              All Jobs
            </option>
            {jobList.map((job, index) => (
              <option key={index} value={job} className="cursor-pointer text-white py-5 dark:bg-kebab-bg-dm">
                {job}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={(e) => {
            e.preventDefault();
            handlePlayerFinderSubmit();
          }}
          className="cursor-pointer p-2 px-5 active:bg-slate-500 bg-gray-600 dark:bg-kebab-btn text-white btn-lnk active:bg-kebab-dk">
          search
        </button>
      </form>

      <div className="p-1 my-1 ronded text-black dark:text-white text-center">
        {state.playerFinderMessages}
      </div>

      <div className="w-full overflow-y-auto max-h-[500px] shadow-lg">
        <table className="w-full text-center dyntable">
          <thead className="sticky top-0 bg-gray-400 dark:bg-kebab-bg-dm">
            <tr>
              <th className="w-1">#</th>
              <th className="w-1/3">Name</th>
              <th className="w-1/3">Job</th>
              <th className="w-1/4">Server</th>
            </tr>
          </thead>
          <tbody className="text-black dark:text-white">
            {state.playerFinderFound.length === 0 ? (
              <tr>
                <td>-</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
            ) : (
              state.playerFinderFound.map((pData, index) => (
                <tr key={index} className="odd:bg-kebab-odd even:bg-kebab-even hover:hover:bg-kebab-dk">
                  <td data-label="#">#{index + 1}</td>
                  <td data-label="Player">
                    <span className="break-all">{pData.player[0]}</span>{' '}
                    {!!pData.player[2] && (
                      <span className={'text-xs bg-gray-400 dark:text-white dark:bg-black p-1 rounded'}>
                        #{pData.player[2]}
                      </span>
                    )}
                    {pData.player[4] && (
                      <span className={'p-1 bg-red-800 ml-1 rounded text-xs text-white select-none'}>
                        Staff
                      </span>
                    )}
                    {pData.player[6] && (
                      <span className={'bg-orange-700 p-1 rounded ml-1 text-xs text-white select-none'}>
                        Donator
                      </span>
                    )}
                  </td>
                  <td data-label="Job">{pData.player[5] || '-'}</td>
                  <td data-label="Server">
                    {pData.server.sname}{' '}
                    <a
                      href={generateJoinLink(pData.server)}
                      title={`Connect to ${pData.server.sname}`}
                      className="lnk-btn">
                      Join
                    </a>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </ContentBlock>
  );
}
