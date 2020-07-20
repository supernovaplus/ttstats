import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../_Store";
import {initAllServers} from "../_Dispatch";

export default function Timer (){
    const [state, setState] = useState({total: 0, online: 0});
    const store = useContext(StoreContext);
    
    function handleOnClickRefresh(){
        initAllServers()(store.dispatch)
    }

    useEffect(() => {
        setState(s => ({
            ...s,
            total: store.state.servers.length,
            online: store.state.servers.reduce((acc,server)=>server.isLoaded === true && server.serverData ? acc + 1 : acc ,0),
        }));

    },[store.state.servers]);

    return (
        <h3>
        Server data is loaded from {state.online} out of {state.total} servers <input type="button" value="refresh all servers" className="btn2 refresh" onClick={handleOnClickRefresh}/>
        </h3>
    )
}