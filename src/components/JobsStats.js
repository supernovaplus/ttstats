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
    const store = useContext(StoreContext);
    const chartRef = useRef();

    
    useEffect(() => {
        if(store.state.servers.reduce((acc,server)=>server.isLoaded === true ? acc + 1 : acc,0) === store.state.servers.length){
            const jobs = {}
            store.state.servers.forEach(server=>{
                if(server.isLoaded === true && server.playersData !== null){
                    server.playersData.forEach(player=>{
                        if(jobs[player[5]] === undefined){
                            jobs[player[5]] = 1;
                        }else{
                            jobs[player[5]]++;
                        }
                    })
                }
            })
            const sortedEntries = (Object.entries(jobs).sort((item1,item2)=>item2[1]-item1[1]));
            setState(s => ({
                ...s,
                entries: sortedEntries,
                counter: (sortedEntries.reduce((acc,val)=>acc+val[1],0))
            }))
        }
    }, [store.state.servers]); 


    useEffect(()=>{
        if(chartRef && chartRef.current){
            const current = chartRef.current.getContext("2d");
            console.log(current)
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
    
                // new Chart(current, {
                //     type: "line",
                //     data: {
                //         //Bring in data
                //         labels: ["Jan", "Feb", "March","AA","Tee"],
                //         datasets: [
                //             {
                //                 label: "Sales",
                //                 data: [86, 67, 91,66,55,66],
                //             },
                //             {
                //                 label: "Kaput",
                //                 data: [11, 2, 33,66,55,66],
                //             }
                //         ]
                //     },
                //     options: {
                //         //Customize chart options
                //     }
                // });

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
                        return <tr key={index}><td>{Math.floor(((job[1]/state.counter) * 100)+0.5)}%</td><td>{job[0]}</td><td>{job[1]}</td><td><Link to={encodeURI("/?playersfinder=job:" + job[0])}>Players</Link></td></tr>
                    })}
                    </tbody>
                </table>
            }

            <div>
                <canvas id="myChart" ref={chartRef}></canvas>
            </div>

            <h3>Total Players Online: {store.state.servers.reduce((acc,server)=>server.isLoaded && server.playersData ? acc + server.playersData.length : acc,0)}</h3>

        </div>
    )



}


// import React, {useContext, useEffect, useState} from "react";
// import {StoreContext} from "./_Store";
// import "./Chart.min.css";

// export default function JobStats (props) {
//     const store = useContext(StoreContext);
//     const [state, setState] = useState(true); //script loaded
//     useEffect(()=>{
//         const script = document.createElement("style");
//         script.src = "/Chart.min.js";
//         script.async = true;
//         script.onload = () => setState(true);
      
//         document.body.appendChild(script);
//     },[])

//     if(state === false){
//         return <div>Loading</div>
//     }else{
//         return <div>Rendered</div>
//     }

// }