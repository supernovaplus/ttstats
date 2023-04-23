import React, { useState, useEffect } from 'react';
import { useDataContext } from '../store/DataContext';
import { PlayerFoundList, PlayerFoundState } from '../types/serverTypes';
import ContentBlock from '../components/ContentBlock';

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
        const playername = player[0] + '#' + player[2];
        if (
          playername.toLowerCase().includes(input) &&
          (state.serverSelect === 'All Servers' || state.serverSelect === servers[key].name) &&
          (state.jobSelect === 'All Jobs' || state.jobSelect === player[5])
        ) {
          playerFinderFound.push([
            playername,
            servers[key]['endpoint'],
            servers[key]['sname'],
            player[3],
            player[5],
          ]);
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
            className="block w-full p-1 my-1 bg-white cursor-pointer text-black">
            <option value="All Servers" className="cursor-pointer text-black">
              All Servers
            </option>
            {Object.values(servers).map((server, index) =>
              server.loaded ? (
                <option key={index} value={server.name} className="cursor-pointer text-black">
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
            <option value="All Jobs">All Jobs</option>
            {jobList.map((job, index) => (
              <option key={index} value={job} className="bg-kebab-border2 text-white">
                {job}
              </option>
            ))}
          </select>
        </div>

        <input
          type="button"
          value="search"
          className="cursor-pointer bg-green-100 p-2 px-5 hover:bg-slate-200 active:bg-slate-500 text-black"
          onClick={() => handlePlayerFinderSubmit()}
        />
      </form>

      <div className="p-1 my-1 ronded text-white text-center">{state.playerFinderMessages}</div>

      <div className="w-full overflow-y-scroll max-h-[500px] shadow-lg ">
        <table className="w-full text-center dyntable">
          <thead>
            <tr>
              <th className="w-1">#</th>
              <th className="w-1/3">Name</th>
              <th className="w-1/3">Job</th>
              <th className="w-1/4">Server</th>
            </tr>
          </thead>
          <tbody className="">
            {state.playerFinderFound.length === 0 ? (
              <tr>
                <td>-</td>
                <td>N/A</td>
                <td>N/A</td>
                <td>N/A</td>
              </tr>
            ) : (
              state.playerFinderFound.map((player, index) => (
                <tr key={index}>
                  <td data-label="#">#{index + 1}</td>
                  <td data-label="Player">
                    <b>{player[0]}</b>
                  </td>
                  <td data-label="Job">{player[4] || '-'}</td>
                  <td data-label="Server">
                    <b>{player[2]}</b>{' '}
                    <a href={`fivem://connect/${player[1]}?pure_1`} title="Connect" className="smallLink mg">
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
