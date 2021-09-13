import React, { useEffect, useState } from "react";
import Loading from "../subcomponents/Loading";

const VehicleClasses = [
	"Compact Cars","Sedans","SUVs","Coupes", "Muscle Cars","Sports Classics","Sports Cars","Super Cars","Motorcycles","Off-road Cars", "Industrial Vehicles","Utility Vehicles","Vans","Cycles","Boats","Helicopters", "Planes","Service Vehicles","Emergency Vehicles","Military Vehicles","Commercial Vehicles","Trains",
];

export default function TopVehicles(){
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
		const controller = new AbortController();
		const signal = controller.signal;
		let isSubscribed = true;
		fetch("https://novaplus-api.herokuapp.com/vehicles", { signal }).then(res => res.json()).then(res => {
			if(res && res.timestamp > 0){
				if (isSubscribed){
					setState(s => ({
						...s, 
						...res,
						total_vehicles: res.sorted_vehicles.reduce((acc, v) => acc + v[1], 0),
						total_classes: res.sorted_classes.reduce((acc, v) => acc + v[1], 0),
						loading: false
					}));
				}
			}else{
				if (isSubscribed){
					setState(s => ({...s, error: "Loading data failed, try again later.", loading: false}));
				}
			}
		}).catch(err=>{
			if (isSubscribed) {
				console.log(err);
				setState(s => ({...s, error: "Loading data failed, try again later.", loading: false}));
			}
		});
		return () => {
			controller.abort();
			isSubscribed = false;
		}
	},[])
	
	return (
		<div className="container">
		<div className="border-start">
			<div className="border-title">Top Vehicles Now</div>
			<div className="border-end scroll">
				{
					state.loading ? <div className="border-title">Loading... <Loading/></div> :
					state.error ? <div className="border-title">{state.error === null ? "" : "Error - " + state.error}</div> :
					<table>
						<thead>
							<tr>
								<th>%</th>
								<th>Name</th>
								<th>Active</th>
							</tr>
						</thead>
						<tbody>
							{
								!state.sorted_vehicles ? <tr><td>-</td><td>N/A</td><td>N/A</td></tr> :
									<>
										{state.sorted_vehicles.map((veh, index) => {
											return (<tr key={index}>
													<td data-label="%">{Number(veh[1]/state.total_vehicles*100).toFixed(2)}%</td>
													<td data-label="Name">{veh[0]}</td>
													<td data-label="Active">{veh[1]}</td>
												</tr>)
										})}
									</>
							}
						</tbody>
					</table>
				}
			</div>
		</div>

		<div className="border-start">
			<div className="border-title">Top Vehicle Classes Now</div>
			<div className="border-end scroll">
				{
					state.loading ? <div className="border-title">Loading... <Loading/></div> :
					state.error ? <div className="border-title">{state.error === null ? "" : "Error - " + state.error}</div> :
					<table>
						<thead>
							<tr>
								<th>%</th>
								<th>Name</th>
								<th>Active</th>
							</tr>
						</thead>
						<tbody>
							{
								!state.sorted_classes ? 
									<tr><td>-</td><td>N/A</td><td>N/A</td></tr> :
										<>
											{state.sorted_classes.map((veh, index) => 
												<tr key={index}>
														<td data-label="%">{Number(veh[1]/state.total_vehicles*100).toFixed(2)}%</td>
														<td data-label="Name">{veh[0] === -1 ? "On Foot" : VehicleClasses[parseInt(veh[0])] || "?"}</td>
														<td data-label="Active">{veh[1]}</td>
												</tr>
											)}
										</>
							}
						</tbody>
					</table>	
				}
			</div>
		</div>

		<div className="border-start">
			<div className="border-title text-center">Vehicle stats updates every 5 minutes<br/>Last Updated: {new Date(state.timestamp).toTimeString()}</div>
			<div className="border-end"></div>
		</div>
	</div>
	)
}