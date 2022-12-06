import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import ServersStatus from "../pages/ServersStatus";
import PlayerFinder from "../pages/PlayerFinder";
import TopJobs from "../pages/TopJobs";
import TopVehicles from "../pages/TopVehicles";
import TopTen from "../pages/TopTen";
import HighestID from "../pages/HighestID";
import Main from "../layouts/main/Main";
import Content from "../layouts/content/Content";
import Sidemenu from "../layouts/sidemenu/Sidemenu";

import { NavLink } from "react-router-dom";

import RefreshButton from "./components/RefreshButton";
import { DataContextProvider } from "../store/data";

export default function App() {
	return (
		<Router basename="/">
			{/* <Router basename="ttstats"> */}
			<DataContextProvider>
				<Main>
					<Sidemenu>
						<RefreshButton />
						<ul>
							<li>
								<NavLink className="potato" to="/">Servers Status</NavLink>
							</li>
							<li>
								<NavLink className="potato" to="/playerfinder">Player Finder</NavLink>
							</li>
							<li>
								<NavLink className="potato" to="/vehicles">Top Vehicles</NavLink>
							</li>
							<li>
								<NavLink className="potato" to="/jobs">Top Jobs</NavLink>
							</li>
							<li>
								<NavLink className="potato" to="/top10">Top 10</NavLink>
							</li>
							<li>
								<NavLink className="potato" to="/highest_id">Highest Player ID</NavLink>
							</li>
							{/* <li><a href="http://ttmap.aca.lt" className="gold">ttmap.aca.lt</a></li> */}
						</ul>
					</Sidemenu>
					<Content>
						<Switch>
							<Route path="/playerfinder">
								<PlayerFinder />
							</Route>
							<Route path="/jobs">
								<TopJobs />
							</Route>
							<Route path="/vehicles">
								<TopVehicles />
							</Route>
							<Route path="/top10">
								<TopTen />
							</Route>
							<Route path="/highest_id">
								<HighestID />
							</Route>
							<Route path="/">
								<ServersStatus />
							</Route>
						</Switch>
					</Content>
				</Main>
			</DataContextProvider>
		</Router>
	);
}
