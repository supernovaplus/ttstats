import React, {useContext, useEffect, useState, useRef} from "react";
import {StoreContext} from "../_Store";
import Chart from "chart.js";
import {Link} from "react-router-dom";

const colorArray = [
    "#FF0000","#00FF00","#800000","#00FFFF","#000000","#B8860B","#4B0082","#FFDEAD","#8B4513","#A52A2A","#B22222","#228B22","#008B8B","#BA55D3","#F0F8FF","#FF8C00","#FF69B4","#FFA07A","#C71585","#FFF8DC","#F0FFF0","#FFFFFF","#00FF7F","#0000FF","#FFF5EE","#2F4F4F","#006400","#9966CC","#FF6347","#ADD8E6","#FF0000","#00FF00","#800000","#00FFFF","#000000","#B8860B","#4B0082","#FFDEAD","#8B4513","#A52A2A","#B22222","#228B22","#008B8B","#BA55D3","#F0F8FF","#FF8C00","#FF69B4","#FFA07A","#C71585","#FFF8DC","#F0FFF0","#FFFFFF","#00FF7F","#0000FF","#FFF5EE","#2F4F4F","#006400","#9966CC","#FF6347",
    "#ADD8E6","#FF69B4","#FFA07A","#C71585","#FFF8DC","#F0FFF0","#FFFFFF","#00FF7F","#0000FF","#FFF5EE","#2F4F4F","#006400","#9966CC","#FF6347","#ADD8E6","#FF0000","#00FF00","#800000","#00FFFF","#000000","#B8860B","#4B0082","#FFDEAD","#8B4513","#A52A2A","#B22222","#228B22","#008B8B","#BA55D3","#F0F8FF","#FF8C00","#FF69B4","#FFA07A","#C71585","#FFF8DC","#F0FFF0","#FFFFFF","#00FF7F","#0000FF","#FFF5EE","#2F4F4F","#006400","#9966CC","#FF6347",
    "#ADD8E6"
];

export default function JobsStats () {
    const [state, setState] = useState({entries: [], counter: 0});
    const [state2, setState2] = useState({entries: [], counter: 0});
    const store = useContext(StoreContext);
    const chartRef = useRef();
    
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
    }, [store.state.servers]); 

    useEffect(()=>{
        if(chartRef && chartRef.current){
            const current = chartRef.current.getContext("2d");
            const instance = new Chart(current, {
                type: 'pie',
                data: {
                labels: state.entries.map(item=>item[0]),
                datasets: [{
                    data: state.entries.map(item=>item[1]),
                    backgroundColor: colorArray,
                    borderWidth: 0
                }]
                },
                options: {
                    legend: {
                        display: false
                    },
                    responsive: true,
            
                    tooltips: {
                        callbacks: {
                                label: (tooltipItem, data) => {
                                const dataset = data.datasets[tooltipItem.datasetIndex];
                                const total = dataset.data.reduce((previousValue, currentValue)=> previousValue + currentValue);
            
                                const currentValue = dataset.data[tooltipItem.index];
                                const percentage = Math.floor(((currentValue/total) * 100)+0.5);
                                return `${data.labels[tooltipItem.index]} - ${currentValue} players (${percentage}%)`;
                                }
                            }
                        } 
                }});
            return () => instance.destroy();
        }
    },[state]);

    return (
        <div id="jobsStats">
            <h2>Top Jobs Now</h2>
            {state.entries.length === 0 ? <div>Loading...</div> : 
                <table>
                    <tbody>
                    <tr><th>%</th><th>Job Name</th><th>Active</th><th>Links</th></tr>
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

            <div id="split"/>

            <div>
                <canvas id="myChart" ref={chartRef}></canvas>
            </div>

            <h3>Total Players Online: {store.state.servers.reduce((acc,server)=>server.isLoaded && server.playersData ? acc + server.playersData.length : acc,0)}</h3>

        </div>
    )
}
