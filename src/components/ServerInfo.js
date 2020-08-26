import React, { useContext, useState, useEffect } from "react";
import { StoreContext } from "../store";
import { Link } from "react-router-dom";

const DxpClock = ({dxp, timestamp}) => {
    const [time, setTime] = useState(  parseInt((timestamp + dxp[2] - Date.now())/1000)  );
    useEffect(()=>{
        const interval = setInterval(()=>{
            setTime(t => {
                if(t <= 1) clearInterval(interval);
                return t-1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const HH = Math.floor(time / (60 * 60));
    const divisor_for_minutes = time % (60 * 60);
    const MM = Math.floor(divisor_for_minutes / 60);
    const SS = Math.ceil(divisor_for_minutes % 60);
    return (<>{time < 1 ? 'finished' : `${HH?HH+'h ':''} ${MM?MM+'m ':''} ${SS?SS+'s':'0s'}`}</>);
}

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
        const dxp = server['serverData'] ? server['serverData']['dxp'] : undefined;
        
        return (
            <div id="serverInfo">
                <h2>
                    Name: {server.name}<br/>
                    IP: <a href ={"fivem://connect/" + server.ip}>{server.ip}</a><br/>
                    Uptime: {server.serverData ? server.serverData.uptime : "?"}<br/>
                    Players: {server.playersData ? server.playersData.length : 0}/{server.playersData ? server.serverData.limit : 0}<br/>
                    <Link to="/" className="btn btn-primary">Back</Link>
                </h2>

                {!server.playersData || server.playersData.length === 0 ? <h2>No Players</h2> : <>
                    {dxp !== undefined && dxp[0] === true ? <>
                        <table>
                            <tbody>
                                <tr>
                                    <th>DXP Active</th>
                                    <th>Hostname</th>
                                    <th>Time Left</th>
                                    <th>Additional Time</th>
                                </tr>
                                <tr>
                                    <td>{dxp[0] ? 'Yes' : 'No'}</td>
                                    <td>{dxp[1]}</td>
                                    <td style={{'minWidth': '150px'}}><DxpClock dxp={dxp} timestamp={server.lastUpdate}/></td>
                                    <td>{dxp[3]}</td>
                                </tr>
                            </tbody>
                        </table>
                    </> : ''}

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