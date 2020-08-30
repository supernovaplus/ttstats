import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store";
import { initAllServers } from "../fetchdata";

export default function Timer (){
    const [state, setState] = useState({total: 0, online: 0});
    const store = useContext(StoreContext);
    
    function handleOnClickRefresh(){
        initAllServers()(store.dispatch)
    }

    useEffect(() => {
        setState(s => {
            let servers = 0;
            let players = 0;
            
            (store.state.servers || []).forEach(server => {
                if(!server.isLoaded || !server.serverData) return;
                servers++;
                if(server.playersData) players += server.playersData.length;
            })

            return ({
                ...s,
                total: store.state.servers.length,
                servers,
                players
            });

        });

    },[store.state.servers]);

    return (
        <div id="footer">
            <input type="button" value={`Servers Loaded: ${state.servers}/${state.total} | Players Online: ${state.players} | click to refresh`} className="refresh dxpcursor" onClick={handleOnClickRefresh}/>
        </div> 
    )
}