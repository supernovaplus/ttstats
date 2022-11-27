import React, { useState, useEffect } from "react";
import { serversAtom } from "../data/dataStore";
import { useRecoilValue } from 'recoil';

export default function PlayerFinder () {
	const servers = useRecoilValue(serversAtom);
	let jobselectURL, serverSelectURL;

	for (const [key, value] of new URLSearchParams(window.location.search)) {
		if(key === "job"){
			jobselectURL = value;
		}else if(key === "server"){
			// serverSelectURL = value;
		}
	}

	const [state, setState] = useState({
		playerFinderMessages: [],
		playerFinderInputField: "",
		playerFinderFound: [],
		serverSelect: serverSelectURL || "All Servers",
		jobSelect: jobselectURL || "All Jobs"
	});

	const [jobList, setJobList] = useState([])

	const handlePlayersNameInput = ({target: { value }}) => {
		setState(s => ({...s, playerFinderInputField: value }));
	}

	const handleServerSelect = ({target: { value }}) => {
		setState(s => ({...s, serverSelect: value }));
	}

	const handleJobSelect = ({target: { value }}) => {
		setState(s => ({...s, jobSelect: value }));
	}

	const handleOnKeyDownEnter = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			handlePlayerFinderSubmit();
		}
	}

	const handlePlayerFinderSubmit = (isButton = true) => {
		const input = state.playerFinderInputField.toLowerCase()
		const playerFinderFound = [];

		for (const key in servers) {
			if(servers[key].playersData === null) continue;
			servers[key].playersData.forEach(player=>{
				const playername = (player[0]+"#"+player[2]);
				if( playername.toLowerCase().includes(input) && 
					(state.serverSelect === "All Servers" || state.serverSelect === servers[key].name) &&
					(state.jobSelect === "All Jobs" || state.jobSelect === player[5])){
						playerFinderFound.push([
							playername,
							servers[key]["endpoint"],
							servers[key]["sname"],
							player[3],
							player[5]
						])
					}
			})
		};

		// const playerFinderFound = store.state.servers.reduce((acc, server) => 
		// [...(server.playersData || []).filter(player => 
		//     (player[0]+"#"+player[2]).toLowerCase().includes(input) &&     
		//     state.serverSelect === "All Servers" || state.serverSelect === server.name && 
		//     (state.jobSelect === "All Jobs" || state.jobSelect === player[5])
		// ), ...acc]
		// , []);

		setState(s=>(
			playerFinderFound.length > 0 ? 
				{   ...s,
					playerFinderMessages: "Found " + playerFinderFound.length + " player" +(playerFinderFound.length === 1 ?"":"s"),
					playerFinderFound
				} : {
					...s,
					playerFinderMessages: isButton ? "Found nothing" : "...",
					playerFinderFound: []
				}
			)
		)
	}

	useEffect(()=>{
		const tempJobsList = []
		for (const key in servers) {
			if(!servers[key].loaded || !servers[key].playersData) continue;
			servers[key].playersData.forEach(player=>{
				if(!tempJobsList.includes(player[5])){
					tempJobsList.push(player[5]);
				}
			})
		}

		setJobList(tempJobsList)
		handlePlayerFinderSubmit(false);

	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ servers ])
  
	return (
		<div className="container">
			<div className="border-start">
				<div className="border-title">Online Player Finder</div>
				<div className="border-end text-center text-shadow">
					<form id="playerFinderForm">
						<div>
							<label htmlFor="playerNameSelector">Filter Name Or ID</label>
							<input type="text" id="playerNameSelector" placeholder="Enter player's name or in-game ID here..." onChange={handlePlayersNameInput} onKeyDown={handleOnKeyDownEnter}/>
						</div>
						<div>
							<label htmlFor="serverSelector">Filter Server</label>
							<select id="serverSelector" onChange={handleServerSelect} value={state.serverSelect} className="bold cursor">
								<option value="All Servers" className="bold">All Servers</option>
								{Object.values(servers).map((server, index) => server.loaded ? <option key={index} value={server.name} className="bold">{server.name}</option> : "")}
							</select>

							<label htmlFor="jobSelector">Filter Job</label>
							<select id="jobSelector" onChange={(input)=>handleJobSelect(input)} value={state.jobSelect} className="bold cursor"> 
								<option value="All Jobs">All Jobs</option>
								{jobList.map((job,index) => <option key={index} value={job} className="bold">{job}</option> )}
							</select>
						</div>

						<input type="button" value="search" className="pfind-btn cursor" onClick={() => handlePlayerFinderSubmit()}/>
					</form>
				</div>
			</div>

			<div className="border-start">
				<div className="border-title">{state.playerFinderMessages}</div>
				<div className="border-end scroll" style={{minHeight: "500px"}}>
					<table>
						<thead>
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Job</th>
								<th>Server</th>
							</tr>
						</thead>
						<tbody>
							{state.playerFinderFound.length === 0 ? 
								<tr>
									<td>-</td>
									<td>N/A</td>
									<td>N/A</td>
									<td>N/A</td>
								</tr> : 
								state.playerFinderFound.map((player,index)=>
									<tr key={index}>
										<td data-label="#">#{index+1}</td>
										<td data-label="Player"><b>{player[0]}</b></td>
										<td data-label="Job">{player[4] || "-"}</td>
										<td data-label="Server"><b>{player[2]}</b> <a href ={`fivem://connect/${player[1]}?pure_1`} title="Connect" className="smallLink mg">Join</a></td>
									</tr>
								)
							}
						</tbody>
					</table>
				</div>
			</div>
	</div>
	)
}