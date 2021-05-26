import React, { createContext, useReducer, useEffect } from 'react';
import * as dispatch_list from "./fetchdata.js"
import servers_list from "./serverslist.json";

const reducer = (data, action) => {
    switch(action.type){
        case ("ADDSERVER"):
            const tempArray = data.servers.slice();
            tempArray.splice(action.index, 0, action.data);
            data.servers = tempArray;
            return {...data};

        case ("SERVERSINITED"):
            return {...data, inited: true};

        case ("UPDATESERVER"):
            data.servers = data.servers.map((data, index) => index !== action.index ? data : {
                  ...data,
                  ...action.data
                });
            return {...data};

        case ("CLEARSERVERSLIST"):
            data.servers = [];
            return {...data};

        case ("UPDATEIP"):
            data.servers[action.index].ip = action.data.ip;
            return {...data};

        default:
            return data;
    }
}

const initialState = {
    servers: [],
    inited: false
}

export const StoreContext = createContext(initialState);

export const StoreProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetch_schedule = setInterval(() => {
            dispatch_list.initAllServers()(dispatch);
        }, 500)

        fetch("https://aca.lt/api_v1/overwrite_servers_list.json").then(res=>res.json()).then(res=>{
            clearTimeout(fetch_schedule);

            for (const index in res) {
                if(index in servers_list){
                    servers_list[index][0] = res[index];
                }
            }
            
            dispatch_list.initAllServers()(dispatch);
        }).catch(err=>{});

        const interval = setInterval(()=>{
            dispatch_list.initAllServers()(dispatch);
        }, 600000); //every 10 minutes

        return () => clearInterval(interval);
    }, []);

    return (
        <StoreContext.Provider value={{state, dispatch, dispatch_list}}>
            {children}
        </StoreContext.Provider>
    );
}