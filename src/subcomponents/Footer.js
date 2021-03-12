import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../data/store";
import { initAllServers } from "../data/fetchdata";

export default function Timer (){
    const [state, setState] = useState({total: 0, online: 0});
    const store = useContext(StoreContext);
    
    const handleOnClickRefresh = () => initAllServers()(store.dispatch);

    const handleToggleBackground = () => {
        const currentStatus = localStorage.getItem("allowVideo");
        if(!currentStatus || currentStatus === "true" ){
            localStorage.setItem("allowVideo", "false")
        }else{
            localStorage.setItem("allowVideo", "true")
        }
        
        window.location.reload(); 
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

            {window.innerWidth > 800 && <input type="button" value="🎥" style={{marginLeft: "1px", lineHeight: "1.1"}} className="refresh dxpcursor" title="toggle video background" onClick={handleToggleBackground}/>}
        </div> 
    )
}