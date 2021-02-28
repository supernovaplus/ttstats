import React, { useState, useEffect } from "react";

const dxpalert = (dxp, timestamp) => {
    if(!dxp || !timestamp) return;
    alert(`Host: ${dxp[1]}\n
DXP Ends: ${new Date(timestamp + dxp[2])}\n
Additional Time: ${dxp[3] ? dxp[3]/1000/60 + ' minutes' : '-'}\n
Started: ${dxp?.[4] ? Math.floor(dxp?.[4]/1000/60) + " minutes ago" : "-"}
    `);
}

export default function DxpClock ({dxp, timestamp, clickable}) {
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
                <span className="dxpcursor" onClick={()=>clickable ? dxpalert(dxp, timestamp) : {}}>
                    {HH?HH+'h ':''} 
                    {MM?MM+'m ': HH?'0m ':''} 
                    {SS?SS+'s':'0s'}
                </span>}
            </>);
}