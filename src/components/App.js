import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import ServersStatus from "./ServersStatus";
import ServerInfo from "./ServerInfo";
import PlayerFinder from "./PlayerFinder";
import JobsStats from "./JobsStats";
import VehicleStats from "./VehicleStats";
import TopTen from "./TopTen";
import Footer from "../subcomponents/Footer";
import { StoreProvider } from '../data/store';
import HighestID from "./HighestID";
// import Other from "./Other";
import Uptime from "./UptimeFrame";
import BackgroundVideo from "../subcomponents/BackgroundVideo";

export default function App() {
  React.useEffect(()=>{
    document.title = "TTSTATS | Transport Tycoon Server Browser";
  },[])

  return (
    <Router basename="/">
    {/* <Router basename="ttstats"> */}
      <StoreProvider>
        <div id="header">
          <ul>
            <li><Link to="/">Servers Status</Link></li>
            <li><Link to="?playerfinder">Player Finder</Link></li>
            <li><Link to="?vehicles">Top Vehicles</Link></li>
            <li><Link to="?jobs">Top Jobs</Link></li>
            <li><Link to="?top10">Top 10</Link></li>
            <li><Link to="?highest_id">Highest Player ID</Link></li>
            {/* <li><Link to="?uptime">Uptime</Link></li> */}
            {/* <li><a href="http://ttmap.aca.lt" className="gold">ttmap.aca.lt</a></li> */}
          </ul>
        </div>

        <div id="content">
          <Route component={
            (props)=>{
              const url = props.location.search.split("=");
              switch(url[0]){
                case ("?status"):
                case (""):
                  return <ServersStatus/>;
                case ("?serverinfo"):
                  return <ServerInfo url={url}/>;
                case ("?jobs"):
                  return <JobsStats/>;
                case ("?vehicles"):
                  return <VehicleStats/>;
                case ("?top10"):
                  return <TopTen/>;
                case ("?playerfinder"):
                  return <PlayerFinder url={url}/>;
                case ("?highest_id"):
                  return <HighestID/>;
                case ("?uptime"):
                  return <Uptime url={url}/>;
                default:
                  return <Redirect to="?status"/>;
              }
            }}/>
        </div>

        <BackgroundVideo/>
        <Footer/>
      </StoreProvider>
    </Router>
  );
}
