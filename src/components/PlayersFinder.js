import React, {useContext, useState, useEffect} from "react";
import {StoreContext} from "../_Store";

const showAvatar = false;

export default function PlayersList (props) {
    const store = useContext(StoreContext);

    var jobselectURL;

    if(props.url.length>1){
        // console.log(props.url)
        props.url.forEach(item=>{
            const data = item.split(":");
            if(data[0] === "job"){
                jobselectURL = decodeURI(data[1]);
            }

        })
    }

    const [localState, setlocalState] = useState({
        playerFinderMessages: [],
        playerFinderInputField: "",
        playerFinderFound: [],
        serverSelect: "All Servers",
        jobSelect: jobselectURL || "All Jobs"
    });



    const [jobList,setJobList] = useState([])

    const handlePlayersNameInput = (input) => {
        const value = input.target.value;
        setlocalState(s => ({...s, playerFinderInputField: value }));
    }

    const handleServerSelect = (input) => {
        const value = input.target.value;
        setlocalState(s => ({...s, serverSelect: value }));
    }

    const handleJobSelect = (input) => {
        const value = input.target.value;
        setlocalState(s => ({...s, jobSelect: value }));
    }

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handlePlayerFinderSubmit();
        }
    }

    const handlePlayerFinderSubmit = (isButton = true) => {
        const input = localState.playerFinderInputField.toLowerCase()
        const playerFinderFound = [];
        store.state.servers.forEach(server=>{
            if(server.playersData === null)return;
            server.playersData.forEach(player=>{
                const playername = (player[0]+"#"+player[2]);
                if(playername.toLowerCase().includes(input) && 
                    (localState.serverSelect === "All Servers" || localState.serverSelect === server.name) &&
                    (localState.jobSelect === "All Jobs" || localState.jobSelect === player[5])){
                        playerFinderFound.push([
                            playername,
                            server["ip"],
                            server["name"],
                            player[3],
                            player[5]
                        ])
                    }
            })
        })

        setlocalState(s=>(
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
        store.state.servers.forEach(server=>{
            if(server.playersData){
                server.playersData.forEach(player=>{
                    if(!tempJobsList.includes(player[5])){
                        tempJobsList.push(player[5]);
                    }
                })
            }
        })

        setJobList(tempJobsList)
        handlePlayerFinderSubmit(false);
    },[store.state.servers])

  
    return (
        <div id="playersFinder">
            <h2>Online Players Finder</h2>
            <div id="form">
                <form>
                    <input type="text" placeholder="Player's name or in-game id" onChange={(input)=>handlePlayersNameInput(input)} onKeyDown={_handleKeyDown}/>
                    <div>
                        <label htmlFor="serverSelector">Filter Server</label>
                        <select id="serverSelector" onChange={handleServerSelect} value={localState.serverSelect}>
                            <option value="All Servers">All Servers</option>
                            {store.state.servers.map((server,index)=>
                                server.isLoaded ? <option key={index} value={server.name}>{server.name}</option> : ""
                            )}
                        </select>
                    </div>

                    <div>
                        <label htmlFor="jobSelector">Filter Job</label>
                        <select id="jobSelector" onChange={(input)=>handleJobSelect(input)} value={localState.jobSelect}> 
                            <option value="All Jobs">All Jobs</option>
                            {jobList.map((job,index)=>
                                <option key={index} value={job}>{job}</option>
                            )}
                        </select>
                    </div>


                    <input type="button" value="search" onClick={()=>handlePlayerFinderSubmit()}/>
                </form>
            </div>


            <h2>
                {localState.playerFinderMessages}
            </h2>


            {!localState.playerFinderFound ? "" :
            (<table>
            <tbody>
                {localState.playerFinderFound.map((player,index)=>
                
                    <tr key={index}>
                        <td>{player[3] && showAvatar === true ? //todo 
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
            </table>)
            }
            <h3>Total Players Online: {store.state.servers.reduce((acc,server)=>server.isLoaded && server.playersData ? acc + server.playersData.length : acc,0)}</h3>
    </div>
    )

}