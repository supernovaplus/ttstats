import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../data/store";
import { Link } from "react-router-dom";

export default function JobsStats () {
    const [state, setState] = useState({entries: [], counter: 0});
    const [state2, setState2] = useState({entries: [], counter: 0});
    const store = useContext(StoreContext);
    
    useEffect(() => {
        if(store.state.inited && store.state.servers.reduce((acc,server)=>server.isLoaded === true ? acc + 1 : acc,0) === store.state.servers.length){
            const jobs = {}

            const companyjobs = {
                "COCO": 0,
                "PIGS": 0,
                "RTS": 0,
                "BAT": 0,
                "FRLLC": 0,
                "IA": 0
            }

            store.state.servers.forEach(server=>{
                if(server.isLoaded === true && server.playersData !== null){
                    server.playersData.forEach(player=>{
                        if(jobs[player[5]] === undefined){
                            jobs[player[5]] = 1;
                        }else{
                            jobs[player[5]]++;
                        }

                        if(player[5].startsWith("P.I.G.S.")){
                            companyjobs["PIGS"]++;
                        }else if(player[5].startsWith("R.T.S.")){
                            companyjobs["RTS"]++;
                        }else if(player[5].startsWith("CollinsCo")){
                            companyjobs["COCO"]++;
                        }else if(player[5].startsWith("IA ")){
                            companyjobs["IA"]++;
                        }else if(player[5].startsWith("BAT")){
                            companyjobs["BAT"]++;
                        }else if(player[5].startsWith("FRLLC")){
                            companyjobs["FRLLC"]++;
                        }

                    })
                }
            })
            const sortedEntries = (Object.entries(jobs).sort((item1,item2)=>item2[1]-item1[1]));
            const sortedEntriesCompany = (Object.entries(companyjobs).sort((item1,item2)=>item2[1]-item1[1]));
            setState(s => ({
                ...s,
                entries: sortedEntries,
                counter: (sortedEntries.reduce((acc,val)=>acc+val[1],0))
            }))
            setState2(s => ({
                ...s,
                entries: sortedEntriesCompany,
                counter: (sortedEntriesCompany.reduce((acc,val)=>acc+val[1],0))
            }))
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [store.state.servers]); 

    return (
        <div className="with-table">
            <h2>Top Jobs Now</h2>
            {state.entries.length === 0 ? <div>Loading...</div> : 
                <table>
                    <tbody>
                    <tr><th>%</th><th>Job Name</th><th>Active</th><th></th></tr>
                    {state.entries.map((job,index)=>{
                        return <tr key={index}><td>{Number(job[1]/state.counter*100).toFixed(1)}%</td><td>{job[0]}</td><td>{job[1]}</td><td><Link to={encodeURI("/?playerfinder=job:" + job[0])}>Players</Link></td></tr>
                    })}
                    </tbody>
                </table>
            }
            
            <div id="split"/>
            
            <h2>Top Company Jobs Now</h2>

            {state2.entries.length === 0 ? <div>Loading...</div> : 
                <table>
                    <tbody>
                    <tr><th>%</th><th>Job Name</th><th>Active</th></tr>
                    {state2.entries.map((job,index)=>{
                        return <tr key={index}><td>{Number(job[1]/state2.counter*100).toFixed(1)}%</td><td>{job[0]}</td><td>{job[1]}</td></tr>
                    })}
                    </tbody>
                </table>
            }
        </div>
    )
}
