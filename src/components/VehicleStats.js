import React, {useContext, useEffect} from "react";
import {StoreContext} from "../_Store";

export default function VehicleStats(){
    const store = useContext(StoreContext);

    useEffect(()=>{
        if(!store.state.inited) return;

        store.state.servers.forEach((server,index) => {
            if(server.isLoaded && !server.error && !server.vehicleData){
                store.dispatchList.fetchDetailedServer(server,index)(store.dispatch)
            }
        });
    },[store.state.inited, store.state.servers, store.dispatchList, store.dispatch])

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
    
    return (
        <div id="carsStats">
            <h2>Top Vehicles Now</h2>
            <table>
                <tbody>
                {list.length === 0 ?  <tr><td>N/A</td></tr> :
                <>
                    <tr><th>%</th><th>Name</th><th>Active</th></tr>
                    {Object.values(list)
                        .sort((a,b) => b.counter - a.counter)
                        .map((vehicle,index)=>
                            <tr key={index}>
                                <td>{Number(vehicle.counter/totalCounter*100).toFixed(2)}%</td>
                                <td>{vehicle.vehicle_name === "None" ? "None, On Foot" : vehicle.vehicle_name}</td>
                                <td>{vehicle.counter}</td>
                            </tr>)}
                </>
                }
                </tbody>
            </table>
            <h3>Total Players Online: {store.state.servers.reduce((acc,server)=>server.isLoaded && server.playersData ? acc + server.playersData.length : acc,0)}</h3>
        </div>
    )
}