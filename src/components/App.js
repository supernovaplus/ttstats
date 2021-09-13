import React, { useEffect } from "react";
import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from "react-router-dom";
import ServersStatus from "./ServersStatus";
import PlayerFinder from "./PlayerFinder";
import TopJobs from "./TopJobs";
import TopVehicles from "./TopVehicles";
import TopTen from "./TopTen";
import RefreshButton from "../subcomponents/RefreshButton";
import HighestID from "./HighestID";
import { DataStore } from "../controllers/dataStore";
import { RecoilRoot } from "recoil";

export default function App() {
	useEffect(() => {
		// const imageId = (new Date()).getSeconds() % 2;
		// const imageId = (new Date()).getHours() % 3;
		// document.body.style.backgroundImage = `url("./media/Untitled-${imageId}.jpg")`;
		document.body.style.backgroundImage = `url("./media/ttstats-bg-0.jpg")`;
	}, [])

	return (
		<Router basename="/">
			{/* <Router basename="ttstats"> */}
			<RecoilRoot>
				<DataStore>
					<div id="header">
						<div className="container">
							<div className="border-start">
								<div className="border-title">
									<div className="flex">
										<div>
											<a href="https://ttstats.eu">ttstats.eu</a>
										</div>
										<div>
											<RefreshButton/>
										</div>
									</div>
								</div>
								<div className="border-end">
									<ul>
										<li><Link to="/">Servers Status</Link></li>
										<li><Link to="/playerfinder">Player Finder</Link></li>
										<li><Link to="/vehicles">Top Vehicles</Link></li>
										<li><Link to="/jobs">Top Jobs</Link></li>
										<li><Link to="/top10">Top 10</Link></li>
										<li><Link to="/highest_id">Highest Player ID</Link></li>
										{/* <li><a href="http://ttmap.aca.lt" className="gold">ttmap.aca.lt</a></li> */}
									</ul>
								</div>
							</div>
						</div>
					</div>
					<div id="content">
						<Switch>
							<Route path="/playerfinder"><PlayerFinder/></Route>
							<Route path="/jobs"><TopJobs/></Route>
							<Route path="/vehicles"><TopVehicles/></Route>
							<Route path="/top10"><TopTen/></Route>
							<Route path="/highest_id"><HighestID/></Route>
							<Route path="/"><ServersStatus /></Route>
						</Switch>
					</div>
				</DataStore>
			</RecoilRoot>
		</Router>
	);
}
