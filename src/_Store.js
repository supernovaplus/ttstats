import React, { createContext, useReducer, useEffect } from 'react';
import * as dispatches from "./_Dispatch.js"


const reducer = (data, action) => {
    switch(action.type){
        // case ("SET"):
        //     return {
        //         ...data,
        //         ...action.data
        //     }
        // case ("PUSH"):
        //     if(data.servers) data.servers.push(action.data)
        //     else data.servers = [action.data];
        //     return {...data};
        case ("ADDSERVER"):
            // if(!data.servers) data.servers = [];
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
        dispatches.initAllServers()(dispatch)
    }, []);

  return (<StoreContext.Provider value={{state, dispatch}}>
    {children}
  </StoreContext.Provider>);
}