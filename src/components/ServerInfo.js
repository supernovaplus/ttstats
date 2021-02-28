import React, { useContext } from "react";
import { StoreContext } from "../data/store";
import { Link } from "react-router-dom";
import DxpClock from "../subcomponents/DxpClock";

export default function ServerInfo (props) {
    const store = useContext(StoreContext);
    const urlprop = parseInt(props.url[1])

    if(!urlprop || isNaN(urlprop)){
        return <h2>URL ERROR</h2>;
    }

    const server = store.state.servers[urlprop-1];
    if(store.state.inited === false){
        return <h2>Loading</h2>;
    }else if(server === undefined){
        return <h2>SERVER ERROR</h2>;
    }else{
        const currentPlayerCount = server.playersData ? server.playersData.length : 0;
        const playerCountLimit = server.serverData ? server.serverData.limit : 0;
        return (
            <div>
                <h2>
                    Name: {server.name}<br/>
                    IP: <a href ={"fivem://connect/" + server.ip}>{server.ip}</a><br/>
                    {server.serverData ? 
                        <>
                            Server Is Online<br/>
                            Uptime: {server.serverData.uptime}<br/>
                            
                            Players Online: {currentPlayerCount <= playerCountLimit ? currentPlayerCount : playerCountLimit + ` (+${currentPlayerCount-playerCountLimit} in queue)`}<br/>
                            Max Players Allowed: {playerCountLimit}
                        </> : <>Server Is Offline</>
                    }<br/>
                    <img src={"https://www.game-state.com/" + server.directIp + "/stats.png"} alt="" className="statsimg-1" referrerPolicy="no-referrer" style={{"minHeight":"200px"}}/><br/>
                    <img src={"https://www.game-state.com/" + server.directIp + "/n-560x95_FFFFFF_FFFFFF_000000_000000.png"} alt="" className="statsimg-2" referrerPolicy="no-referrer" style={{"minHeight":"95px"}}/><br/>
                </h2>
                <h2><Link to="/" className="refresh dxpcursor" style={{"boxShadow": "0px 0px 3px black"}}>Back</Link></h2>
                {/* {server.serverData.dxp = undefined} */}
                {server?.serverData?.dxp?.[0] === true ? 
                <h2>
                    {console.log(server.serverData?.dxp)}
                    DXP Info<br/>
                    Time left: <DxpClock dxp={server.serverData?.dxp} timestamp={server.lastUpdate} clickable={false}/><br/>
                    Sponsored by: {server.serverData?.dxp?.[1]}<br/>
                    Next DXP time: {server.serverData?.dxp?.[3] ? server.serverData?.dxp?.[3]/1000/60 + " minutes" : "-"}<br/>
                    Started: {server.serverData?.dxp?.[4] ? Math.floor(server.serverData?.dxp?.[4]/1000/60) + " minutes ago" : "-"}
                </h2>
                                
                : <></>}

                {!server.playersData || server.playersData.length === 0 ? <h2>No Players</h2> : <>
                    <table>
                        <tbody>
                            <tr><th>Avatar</th><th>#</th><th>Name #ID</th><th>Job</th></tr>
                            {server.playersData.map((player,index) => (
                            <tr key={index}>
                                <td>
                                    {player[3] ? 
                                        <a href={player[3]} target="_blank" rel="noopener noreferrer"><img src={player[3] || "#"} height="50px" alt="img" className="avatar"/></a>: 
                                        <img className="no-avatar" src="media/no-avatar.gif" alt="-"/>}
                                </td>
                                <td>#{index+1}</td>
                                <td>
                                    <b>
                                        {player[0]} <small>#{player[2]}</small> 
                                        {player[4] && <small className={"bg-red mg"}>Staff</small>}
                                        {player[6] && <small className={"bg-yellow mg"}>Donator</small>}
                                    </b>
                                </td>
                                <td>{player[5] || "-"}</td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </>}
            <h2>Last Updated: {new Date(server.lastUpdate).toTimeString()}</h2>
        </div>
        );
    }
}