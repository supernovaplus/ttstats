import React, { createContext, useReducer, useEffect } from 'react';
import * as dispatchList from "./_Dispatch.js"

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
        dispatchList.initAllServers()(dispatch)
    }, []);

  return (<StoreContext.Provider value={{state, dispatch, dispatchList}}>
    {children}
  </StoreContext.Provider>);
}