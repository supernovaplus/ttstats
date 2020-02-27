import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "./_Store";
import {Link} from "react-router-dom";


export default function ServersStatus(){
    const store = useContext(StoreContext);

    return (
        <div>
            <h2>Transport Tycoon Servers List</h2>
            
            <table id="serversList">
                <tbody>
                <tr><th>Connect</th><th>Players</th><th>Status</th><th>Uptime</th><th>Details</th></tr>
                {store.state.servers.map((server,index)=>{
                    if (server.error) {
                        return (
                            <tr key={index}><td>{server.ip}<br/><b>{server.name}</b></td><td>-/-</td><td style={{color: "red"}}>OFFLINE</td><td></td><td></td></tr>
                        );

                    } else if (server.isLoaded === false) {

                        return (
                            <tr key={index}><td>{server.ip}<br/><b>{server.name}</b></td><td>-/-</td><td style={{color: "grey"}}>Loading</td><td></td><td></td></tr>
                        );
                    
                    } else if (server.playersData === undefined) {
                        return (
                            <tr key={index}><td>{server.ip}<br/><b>{server.name}</b></td><td>-/-</td><td style={{color: "red"}}>ERROR</td><td></td><td></td></tr>
                        );

                    } else {
                        return (
                            <tr key={index}><td><a href ={"fivem://connect/" + server.ip} title="connect">{server.ip}</a><br/><b>{server.name}</b></td><td>{server.playersData.length}/{server.serverData.limit}</td><td style={{color: "green"}}>ONLINE</td><td>{server.serverData ? server.serverData.uptime : "-"}</td><td><Link to={"/?serverinfo="+(+index+1)} className="btn btn-primary">Players</Link></td></tr>
                        );
                    }
                })}
                </tbody>
            </table>
            <h3>Total Players Online: {store.state.servers.reduce((acc,server)=>server.isLoaded && server.playersData ? acc + server.playersData.length : acc,0)}</h3>
        </div>
    )


    
}