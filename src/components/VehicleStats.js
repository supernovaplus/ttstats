import React, {useContext, useEffect, useState} from "react";
import {StoreContext} from "../_Store";
import Chart from "chart.js";
// import {Link} from "react-router-dom";


export default function VehicleStats(){
    const store = useContext(StoreContext);
    const [isLoadingServers, setIsLoadingServers] = useState([]);

    useEffect(()=>{
        if(store.state.inited){
            store.state.servers.forEach((server,index) => {
                if(server.isLoaded && !server.error && !server.vehicleData && !isLoadingServers.includes(index)){
                    setIsLoadingServers(s=>[...s, index]);
                    store.dispatchList.fetchDetailedServer(server,index)(store.dispatch)
                }
            });
        }
    },[store.state.inited, store.state.servers])

    const list = {};
    let totalCounter = 0;
    store.state.servers.forEach((server,index)=>{
        if(!server.vehicleData)return;

        server.vehicleData.forEach(vehicle=>{
            if(list[vehicle.vehicle_model] === undefined){
                list[vehicle.vehicle_model] = {
                    counter: 1, 
                    vehicle_name: vehicle.vehicle_name
                };
                totalCounter++;
            }else{
                list[vehicle.vehicle_model].counter++;
                totalCounter++;
            }

        })
    })

    const list2 = Object.values(list).sort((a,b) => b.counter - a.counter);
    
    return (
        <div id="carsStats">
            <h2>Top Vehicles Now</h2>
            
            <table>
                <tbody>
                {/* <tr><th>Connect</th><th>Players</th><th>Status</th><th>Uptime</th><th>Details</th></tr> */}
                {/* {store.state.servers.map((server,index)=>
                    !server.vehicleData ? "" :
                server.vehicleData.map(player => <tr><td>{counter++}</td><td>{index}</td><td>{player.vehicle_name}</td></tr> )
                )} */}
                {list2.length === 0 ? 
                    <tr><td>N/A</td></tr> 
                :   <>
                    <tr><th>%</th><th>Job Name</th><th>Active</th></tr>
                    {list2.map((vehicle,index)=><tr key={index}><td>{Math.floor(((vehicle.counter/totalCounter) * 100)+0.5)}%</td><td>{vehicle.vehicle_name}</td><td>{vehicle.counter}</td></tr>)}
                    </>
                }
                </tbody>
            </table>
            <h3>Total Players Online: {store.state.servers.reduce((acc,server)=>server.isLoaded && server.playersData ? acc + server.playersData.length : acc,0)}</h3>

        </div>
    )

    // return (
    //     <div id="carsStats">
    //         <h2>Transport Tycoon Servers List</h2>
            
    //         <table>
    //             <tbody>
    //             {/* <tr><th>Connect</th><th>Players</th><th>Status</th><th>Uptime</th><th>Details</th></tr> */}
    //             {store.state.servers.map((server,index)=>
    //                 <tr key={index}><td>{server.index}</td><td>{JSON.stringify(server.vehicleData)}</td></tr>
    //             )}
    //             </tbody>
    //         </table>
    //     </div>
    // )


    
}