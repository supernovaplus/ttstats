import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link//,
  // Redirect
} from "react-router-dom";
import ServersStatus from "./ServersStatus";
import ServerInfo from "./ServerInfo";
import PlayerFinder from "./PlayerFinder";
import JobsStats from "./JobsStats";
import VehicleStats from "./VehicleStats";
import Footer from "./Footer";
import { StoreProvider } from '../store';
import HighestID from "./HighestID";


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
            <li><Link to="?vehicles">Vehicle Stats</Link></li>
            <li><Link to="?jobs">Job Stats</Link></li>
            <li><Link to="?highest_id">Highest Player ID</Link></li>
            {/* <li><a href="http://ttmap.aca.lt" className="gold">ttmap.aca.lt</a></li> */}
          </ul>
        </div>

        <div id="content">
          <Route component={
            (props)=>{
              const url = props.location.search.split("=");
              switch(url[0]){
                case ("?status"):
                  return <ServersStatus/>;
                case ("?serverinfo"):
                  return <ServerInfo url={url}/>;
                case ("?jobs"):
                  return <JobsStats/>;
                case ("?vehicles"):
                  return <VehicleStats/>;
                case ("?playerfinder"):
                  return <PlayerFinder url={url}/>;
                case ("?highest_id"):
                  return <HighestID/>;
                default:
                  return <ServersStatus/>;
              }
            }}/>
        </div>

        <Footer/>
      </StoreProvider>
    </Router>
  );
}
