import React, { useState, useEffect } from "react";

const dxpalert = (dxp, timestamp) => {
    if(!dxp || !timestamp) return;
    alert(`Host: ${dxp[1]}\nDxp ends: ${new Date(timestamp + dxp[2])}\nAdditional time: ${dxp[3] ? '-' : Number(dxp[3]/1000/60).toFixed(1) + ' min'}`);
}

export default function DxpClock ({dxp, timestamp}) {
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

    const HH = Math.floor(time / 3600);
    const divisor_for_minutes = time % 3600;
    const MM = Math.floor(divisor_for_minutes / 60);
    const SS = Math.ceil(divisor_for_minutes % 60);
    return (<>{time < 1 ? '-' : 
                <span className="dxppointer" onClick={()=>dxpalert(dxp, timestamp)}>
                    {HH?HH+'h ':''} 
                    {MM?MM+'m ': HH?'0m ':''} 
                    {SS?SS+'s':'0s'}
                </span>}
            </>);
}