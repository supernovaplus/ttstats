import React, { useContext } from "react";
import { StoreContext } from "../store";
import { Link } from "react-router-dom";

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
                    <img src={"https://www.game-state.com/" + server.directIp + "/stats.png"} alt="" className="statsimg-1" referrerPolicy="no-referrer"/><br/>
                    <img src={"https://www.game-state.com/" + server.directIp + "/n-560x95_FFFFFF_FFFFFF_000000_000000.png"} alt="" className="statsimg-2" referrerPolicy="no-referrer"/><br/>

                    <Link to="/" className="refresh dxpcursor">Back</Link>
                </h2>

                {!server.playersData || server.playersData.length === 0 ? <h2>No Players</h2> : <>
                    <table>
                        <tbody>
                            <tr><th>Avatar</th><th>#</th><th>Name</th><th>ID</th><th>Job</th></tr>
                            {server.playersData.map((player,index) => (
                            <tr key={index} title={`${player[4] ? "[STAFF]" : ""}${player[6] ? "[DONATOR]" : ""}`}>
                                <td>
                                    {player[3] ? 
                                        <a href={player[3]} target="_blank" rel="noopener noreferrer"><img src={player[3] || "#"} height="50px" alt="img" className="avatar"/></a>: 
                                        <div className="no-avatar"/>}
                                </td>
                                <td>#{index+1}</td>
                                <td><b>{player[0]} {
                                        player[4] && <img src="staff.gif" className="mini-icon" alt=""/>
                                    } {
                                        player[6] && <img src="donator.gif" className="mini-icon" alt=""/>
                                    }</b></td>
                                <td>{player[2]}</td>
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