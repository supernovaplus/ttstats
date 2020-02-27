import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "./_Store";
import Chart from "chart.js";

export default function JobsStats () {
    const [state, setState] = useState({entries: [], counter: 0});
    const store = useContext(StoreContext);
    const chartRef = React.createRef();
    const colorArray = [
        "#FF0000","#00FF00","#800000","#00FFFF","#000000","#B8860B","#4B0082","#FFDEAD","#8B4513","#A52A2A","#B22222","#228B22","#008B8B","#BA55D3","#F0F8FF","#FF8C00","#FF69B4","#FFA07A","#C71585","#FFF8DC","#F0FFF0","#FFFFFF","#00FF7F","#0000FF","#FFF5EE","#2F4F4F","#006400","#9966CC","#FF6347","#ADD8E6","#FF0000","#00FF00","#800000","#00FFFF","#000000","#B8860B","#4B0082","#FFDEAD","#8B4513","#A52A2A","#B22222","#228B22","#008B8B","#BA55D3","#F0F8FF","#FF8C00","#FF69B4","#FFA07A","#C71585","#FFF8DC","#F0FFF0","#FFFFFF","#00FF7F","#0000FF","#FFF5EE","#2F4F4F","#006400","#9966CC","#FF6347",
        "#ADD8E6","#FF69B4","#FFA07A","#C71585","#FFF8DC","#F0FFF0","#FFFFFF","#00FF7F","#0000FF","#FFF5EE","#2F4F4F","#006400","#9966CC","#FF6347","#ADD8E6","#FF0000","#00FF00","#800000","#00FFFF","#000000","#B8860B","#4B0082","#FFDEAD","#8B4513","#A52A2A","#B22222","#228B22","#008B8B","#BA55D3","#F0F8FF","#FF8C00","#FF69B4","#FFA07A","#C71585","#FFF8DC","#F0FFF0","#FFFFFF","#00FF7F","#0000FF","#FFF5EE","#2F4F4F","#006400","#9966CC","#FF6347",
        "#ADD8E6"
    ];
    
    useEffect(() => {
        if(store.state.servers.reduce((acc,server)=>server.isLoaded === true ? acc + 1 : acc,0) === store.state.servers.length){
            const jobs = {}
            store.state.servers.forEach(server=>{
                if(server.isLoaded === true && server.playersData !== null){
                    server.playersData.forEach(player=>{
                        const jobName = (player[5] === "" ? "Unemployed" : player[5]);
                        if(jobs[jobName] === undefined){
                            jobs[jobName] = 1;
                        }else{
                            jobs[jobName]++;
                        }
                    })
                }
            })
            const sortedEntries = (Object.entries(jobs).sort((item1,item2)=>item2[1]-item1[1]));
            setState({
                ...state,
                entries: sortedEntries,
                counter: (sortedEntries.reduce((acc,val)=>acc+val[1],0))
            })
    }}, [store.state.servers]); 

    if(state.entries.length === 0){
        return <div>Loading</div>
    }
    return (
        <div>
        <h2>Top Jobs Now</h2>
        <table className="jobstatstable">
            <tbody>
            <tr><th>%</th><th>Job Name</th><th>Active</th></tr>
            {state.entries.map((job,index)=>{
                return <tr key={index}><td>{Math.floor(((job[1]/state.counter) * 100)+0.5)}%</td><td>{job[0]}</td><td>{job[1]}</td></tr>
            })}
            </tbody>
        </table>
        </div>
    
        // for (let i = 0; i < data.length; i++) {
        //     table.innerHTML+=`<tr><td></td><td class="mid">${data[i][0]}</th><td style="right">${(data[i][1]===1?data[i][1]+" player":data[i][1]+" players")}</td></tr>`;
        // }
    )


        


    

        // const myChartRef = this.chartRef.current.getContext("2d");
        // const finalList = [];
        // new Chart(myChartRef, {
        //     type: 'pie',
        //     data: {
        //     labels: finalList.map(item=>item[0]),
        //     datasets: [{
        //         data: finalList.map(item=>item[1]),
        //         backgroundColor: colorArray,
        //         borderWidth: 0
        //     }]
        //     },
        //     options: {
        //         legend: {
        //             display: false
        //         },
        //         responsive: true,
        
        
        //         tooltips: {
        //             callbacks: {
        //                     label: function(tooltipItem, data) {
                                
        //                     const dataset = data.datasets[tooltipItem.datasetIndex];
                            
        //                     const total = dataset.data.reduce(function(previousValue, currentValue, currentIndex, array) {
        //                         return previousValue + currentValue;
        //                     });
        
        //                     const currentValue = dataset.data[tooltipItem.index];
        //                     const percentage = Math.floor(((currentValue/total) * 100)+0.5);
        //                     return `${data.labels[tooltipItem.index]} - ${currentValue} players (${percentage}%)`;
        
        //                     }
        //                 }
        //             } 
                            
        //     }
        //     });



        // new Chart(myChartRef, {
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
    // }
    // render() {
    //     return (
    //         <div>
    //             <canvas
    //                 id="myChart"
    //                 ref={this.chartRef}
    //             />
    //         </div>
    //     )
    // }
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