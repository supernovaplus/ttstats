import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "./_Store";

export default function Timer (){
    const [state, setState] = useState(true);
    const store = useContext(StoreContext);
    const time = Date.now()
    let lastUpdate = 0;
    
    useEffect(() => {
        const interval = setInterval(() => {
            setState(!state);console.log("test")
        }, 5000);
    
        return () => clearInterval(interval);
    });
    



    return (<div>TIMERRRR {lastUpdate}</div>)
}