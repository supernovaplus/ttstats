import React, { useContext } from "react";
import { StoreContext } from "../data/store";
import { Link } from "react-router-dom";
import DxpClock from "../subcomponents/DxpClock";
import Uptime from "../subcomponents/Uptime";

export default function ServersStatus(){
    const store = useContext(StoreContext);

    return (
        <div id="servers-status">
            <h2>Transport Tycoon Servers List</h2>
            <table>
                <tbody>
                <tr><th>Connect</th><th>Players</th><th>Status</th><th>Uptime</th><th>DXP</th></tr>
                {store.state.servers.map((server,index)=>{

                    if (server.error || server.playersData === undefined || server.isLoaded === false) {
                        return (
                            <tr key={index}>

                                <td>{server.ip}<br/><b>{server.name}</b></td>
                                <td>-/-</td>
                                {server.isLoaded === false ? 
                                    <td className="loading">Loading</td> : 
                                        <td className="offline">
                                            <Link to={"/?serverinfo="+(+index+1)} className="btn btn-primary" title="Server Info">
                                                OFFLINE
                                            </Link>
                                        </td>
                                    }
                                <td>-</td>
                                <td className="dxp">-</td>
                            </tr>
                        );
                    } else {
                        const dxp = server['serverData']['dxp'];
                        const isDxpActive = dxp !== undefined && dxp[0] === true;
                        
                        return (
                            <tr key={index}>
                                <td>
                                    <a href ={"fivem://connect/" + server.ip} title="Connect to the server">{server.ip}</a><br/>
                                    <b>{server.name}</b>
                                </td>
                                <td>
                                    <Link to={"/?serverinfo="+(+index+1)} className="btn btn-primary" title="Server Info">{
                                        server.playersData.length <= server.serverData.limit ? 
                                            server.playersData.length : 
                                                server.serverData.limit + "+"
                                        }/{server.serverData.limit}</Link>
                                </td>
                                {/* <td className="offline">
                                            <Link to={"/?uptime=0"} className="btn btn-primary" title="Server Info">
                                                UPTIME
                                            </Link>
                                        </td> */}
                                <td className="online">ONLINE</td>
                                <td>{server.serverData ? <Uptime time={server.serverData.uptime}/> : '-'}</td>
                                <td className="dxp">{isDxpActive ? <DxpClock dxp={dxp} timestamp={server.lastUpdate} clickable={true}/> : <>-</>}</td>
                            </tr>
                        );
                    }
                })}
                </tbody>
            </table>
        </div>
    )
}