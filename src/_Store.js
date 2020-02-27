import React, { createContext, useReducer, useEffect } from 'react';
import * as dispatches from "./_Dispatch.js"


const reducer = (data, action) => {
    switch(action.type){
        case ("SET"):
            return {
                ...data,
                ...action.data
            }
        case ("PUSH"):
            if(data.servers) data.servers.push(action.data)
            else data.servers = [action.data];
            return {...data};
        case ("UPDATESERVER"):
            data.servers = data.servers.map((data, index) => index !== action.index ? data : {
                  ...data,
                  ...action.data
                });
            return {...data};
        case ("SERVERSINITED"):
            return {...data, inited: true};
        case ("ADDSERVER"):
            // if(!data.servers) data.servers = [];
            const tempArray = data.servers.slice()
            tempArray.splice(action.index, 0, action.data)
            data.servers = tempArray;
            return {...data}
        case ("SETKEY"):
            data[action.data.name] = action.data.value;
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
//   dispatch({type:"ADDSERVER",data:{"kebab":"potato"}})
//   dispatches.initAllServers()(dispatch)
    // dispatches.initAllServers();
    useEffect(() => {
        dispatches.initAllServers()(dispatch)
      }, []);

  return (<StoreContext.Provider value={{
    // servers: state.servers
    state
    }}>
    {children}
  </StoreContext.Provider>);
}

// const store = createStore(
//     reducer,
//     {
//         servers: [],
//         inited: false
//     },
// //   compose(
// //     applyMiddleware(...[thunk]),
// //     window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// //   )
// );

