import React, { createContext, useReducer, useEffect } from 'react';
import * as dispatch_list from "./fetchdata.js"

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
        dispatch_list.initAllServers()(dispatch);

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