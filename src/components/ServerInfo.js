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
        return (
            <div>
                <h2>
                    Name: {server.name}<br/>
                    IP: <a href ={"fivem://connect/" + server.ip}>{server.ip}</a><br/>
                    {server.serverData ? 
                        <>
                            Uptime: {server.serverData.uptime}<br/>
                            Players: {server.playersData ? server.playersData.length : 0}/{server.playersData ? server.serverData.limit : 0}<br/>
                            <img src={"https://www.game-state.com/" + server.directIp + "/stats.png"} alt="" className="statsimg-1" referrerpolicy="no-referrer"/><br/>
                            <img src={"https://www.game-state.com/" + server.directIp + "/n-560x95_FFFFFF_FFFFFF_000000_000000.png"} alt="" className="statsimg-2" referrerpolicy="no-referrer"/>
                        </> :
                        <>Server Is Offline</>
                    }<br/>
                    <Link to="/" className="refresh dxpcursor">Back</Link>
                </h2>

                {!server.playersData || server.playersData.length === 0 ? <h2>No Players</h2> : <>
                    <table>
                        <tbody>
                            <tr><th>Avatar</th><th>#</th><th>Name</th><th>ID</th><th>Job</th></tr>
                            {server.playersData.map((player,index) => (
                            <tr key={index}>
                                <td>
                                    {player[3] ? 
                                        <a href={player[3]} target="_blank" rel="noopener noreferrer"><img src={player[3] || "#"} height="50px" alt="img" className="avatar"/></a> : 
                                        <div className="no-avatar"/>}
                                </td>
                                <td>#{index+1}</td>
                                <td><b>{player[0]}</b></td>
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