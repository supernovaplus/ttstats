import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store";

const VehicleClasses = [
    "Compact Cars","Sedans","SUVs","Coupes", "Muscle Cars","Sports Classics","Sports Cars","Super Cars","Motorcycles","Off-road Cars", "Industrial Vehicles","Utility Vehicles","Vans","Cycles","Boats","Helicopters", "Planes","Service Vehicles","Emergency Vehicles","Military Vehicles","Commercial Vehicles","Trains",
];

export default function VehicleStats(){
    const store = useContext(StoreContext);
    const [state, setState] = useState({
        loading: true,
        error: null,
        timestamp: 0,
        total_vehicles: 0,
        total_classes: 0,
        sorted_vehicles: null,
        sorted_classes: null,
    });

    useEffect(()=>{
        fetch("https://novaplus.herokuapp.com/vehicles").then(res=>res.json()).then(res=>{
            if(res && res.timestamp > 0){
                setState(s => ({...s, 
                                ...res,
                                total_vehicles: res.sorted_vehicles.reduce((acc, v) => acc + v[1], 0),
                                total_classes: res.sorted_classes.reduce((acc, v) => acc + v[1], 0),
                                loading: false
                            }));
            }else{
                setState(s => ({...s, error: "Error while loading the data", loading: false}));
            }
        }).catch(err=>{
            console.log(err);
            setState(s => ({...s, error: "Error while state.loading the data", loading: false}));
        })
    },[])

    
    return (
        <div id="carsStats">
            <h2>Top Vehicles Now</h2>

            {state.loading ? <h2>Loading</h2> : 
                state.error ? <h2>Error while trying to load the data, try again later.</h2> :
                    <>
                    <table>
                        <tbody>
                            {!state.sorted_vehicles ? <tr><td>N/A</td></tr> :
                                <>
                                    <tr><th>%</th><th>Name</th><th>Active</th></tr>
                                    {state.sorted_vehicles.map((veh, index) => {
                                        return (<tr key={index}>
                                                <td>{Number(veh[1]/state.total_vehicles*100).toFixed(2)}%</td>
                                                <td>{veh[0]}</td>
                                                <td>{veh[1]}</td>
                                            </tr>)
                                    })}
                                </>
                            }
                        </tbody>
                    </table>

                    <h2>Top Vehicle Classes Now</h2>
                    <table>
                        <tbody>
                            {!state.sorted_classes ? <tr><td>N/A</td></tr> :
                                <>
                                    <tr><th>%</th><th>Name</th><th>Active</th></tr>
                                    {state.sorted_classes.map((veh, index) => {
                                        return (<tr key={index}>
                                                <td>{Number(veh[1]/state.total_vehicles*100).toFixed(2)}%</td>
                                                <td>{veh[0] === -1 ? "On Foot" : VehicleClasses[parseInt(veh[0])] || "?"}</td>
                                                <td>{veh[1]}</td>
                                            </tr>)
                                    })}
                                </>
                            }
                        </tbody>
                    </table>

                    <h3>Vehicle stats updates every 5 minutes<br/>Last Updated: {new Date(state.timestamp).toTimeString()}</h3>
                    </>
            }
            <h3>Total Players Online: {store.state.servers.reduce((acc,server)=>server.isLoaded && server.playersData ? acc + server.playersData.length : acc, 0)}</h3>
        </div>
    )
}