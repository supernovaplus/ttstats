import React, {useContext} from "react";
import {StoreContext} from "./_Store";
import {Link} from "react-router-dom";

export default function ServerDetails (props) {
    const store = useContext(StoreContext);

    if(!props.url || isNaN(props.url))
        return <div><h2>URL ERROR</h2></div>;

    const server = store.state.servers[props.url-1];
    if(store.state.inited === false){
        return <div><h2>Loading</h2></div>;
    }else if(server === undefined){
        return <div><h2>SERVER ERROR</h2></div>;
    }else{
        const header = (
            <div>
            <h2>
                Players List On {server.name}<br/>
                IP: <a href ={"fivem://connect/" + server.ip}>{server.ip}</a><br/>
                Uptime: {server.serverData ? server.serverData.uptime : "?"}<br/>
                <Link to="/?status" className="btn btn-primary">Back</Link>
            </h2>
            </div>)

        if(!server.playersData || server.playersData.length === 0){
            return (
                <div>
                {header}
                <h2>No Players</h2>
                </div>
            ) 
        }

        return (
            <div>
            {header}
            
            <table id="playersList">
            <tbody>
                <tr><th>Avatar</th><th>#</th><th>Name</th><th>ID</th><th>Job</th></tr>
                {server.playersData.map((player,index) => (
                <tr key={index}>
                    <td>{player[3] ? 
                        <a href={player[3]} target="_blank" rel="noopener noreferrer"><img src={player[3] || "#"} height="50px" alt="img" className="avatar"/></a> : 
                        <div className="no-avatar"/>
                    }</td>
                    <td>#{index+1}</td>
                    <td><b>{player[0]}</b></td>
                    <td>{player[2]}</td>
                    <td>{player[5] || "-"}</td>
                </tr>
                ))}

            </tbody>
            </table>
            <h3>Updated on {new Date(server.lastUpdate).toTimeString()}</h3>
            </div>)


    }
}