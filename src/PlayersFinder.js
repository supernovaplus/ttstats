import React, {useContext, useState, useEffect} from "react";
import {StoreContext} from "./_Store";


export default function PlayersList (props) {
    const store = useContext(StoreContext); 

    const [localState, setlocalState] = useState({
        playerFinderMessages: [],
        playerFinderInputField: "",
        playerFinderFound: [],
        serverSelect: "All Servers",
        jobSelect: "All Jobs",
        jobsList: []
    });

    const handlePlayersNameInput = (input) => {
        setlocalState({...localState, playerFinderInputField: input.target.value });
    }

    const handleServerSelect = (input) => {
        setlocalState({...localState, serverSelect: input.target.value });
    }

    const handleJobSelect = (input) => {
        setlocalState({...localState, jobSelect: input.target.value });
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handlePlayerFinderSubmit();
        }
    }

    const handlePlayerFinderSubmit = () => {
        // if(!localState.playerFinderInputField || localState.playerFinderInputField.length < 1)
        //     return setlocalState({...localState, playerFinderMessages: "Invalid name or in-game id"});
        const input = localState.playerFinderInputField.toLocaleLowerCase()
        const playerFinderFound = [];
        store.state.servers.forEach(server=>{
            if(server.playersData === null)return;
            server.playersData.forEach(player=>{
            const playername = (player[0]+"#"+player[2]);
            if(playername.toLowerCase().includes(input) && 
                    (localState.serverSelect === "All Servers" || localState.serverSelect === server.name) &&
                    (localState.jobSelect === "All Jobs" || localState.jobSelect === player[5]))
                playerFinderFound.push([
                            playername,
                            server["ip"],
                            server["name"],
                            player[3],
                            player[5]
                        ])})
        })
        if(playerFinderFound.length > 0){
            setlocalState({
                ...localState,
                playerFinderMessages: "Found " + playerFinderFound.length + " player" +(playerFinderFound.length === 1 ?"":"s"),
                playerFinderFound
            });
        }else{
            setlocalState({
                ...localState,
                playerFinderMessages: "Found nothing",
                playerFinderFound: []
            });
        }
    }

    const getAllJobs = () => {
        const list = [];
        store.state.servers.forEach(server=>{
            if(server.isLoaded === true && server.playersData){
                server.playersData.forEach(player=>{
                    if(!list.includes(player[5]))
                        list.push(player[5])
                })
            }
        })
        setlocalState({...localState,jobsList:list})
    }

    useEffect(()=>{
        handlePlayerFinderSubmit();
        getAllJobs();
    },[store.state.servers])

  
    return (
        <div id="playerFinder">
        <h2>Online Players Finder</h2>

        <form>
            <input type="text" placeholder="Player's name or in-game id" onChange={(input)=>handlePlayersNameInput(input)} onKeyDown={_handleKeyDown}/><br/>
            

            <label htmlFor="serverSelector">Filter Server: </label>
            <select id="serverSelector" onChange={handleServerSelect}>
                <option value="All Servers">All Servers</option>
                {store.state.servers.map((server,index)=>{
                    return server.isLoaded?<option key={index} value={server.name}>{server.name}</option>:""
                })}
            </select><br/>

            <label htmlFor="jobSelector">Filter Job: </label>
            <select id="jobSelector" onChange={handleJobSelect}>
                <option value="All Jobs">All Jobs</option>
                {localState.jobsList.map((job,index)=>{
                    return <option key={index} value={job}>{job}</option>
                })}
            </select><br/>
            <input type="button" value="search" onClick={()=>handlePlayerFinderSubmit()}/>
        </form>



        <div>
        <p>
            {localState.playerFinderMessages}
        </p>
        <table id="playersFound">
            <tbody>
            {!localState.playerFinderFound ? "" :
                localState.playerFinderFound.map((player,index)=>
                
                <tr key={index}>
                    <td>{player[3] ? 
                        <a href={player[3]} target="_blank" rel="noopener noreferrer"><img src={player[3] || "#"} height="50px" alt="img" className="avatar"/></a> : 
                        <div className="no-avatar"/>
                    }</td>
                    <td>#{index+1}</td>
                    <td><b>{player[0]}</b></td>
                    <td>{player[4] || "-"}</td>
                    <td><a href ={"fivem://connect/" + player[1]} title="connect">{player[1]}</a><br/><b>{player[2]}</b></td>
                </tr>
            )}
            </tbody>
        </table>
        </div>
        </div>
    )

}