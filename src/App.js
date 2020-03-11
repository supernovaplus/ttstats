import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import ServersStatus from "./components/ServersStatus";
import ServerInfo from "./components/ServerInfo";
import PlayersFinder from "./components/PlayersFinder";
import JobsStats from "./components/JobsStats";
import VehicleStats from "./components/VehicleStats";
import Timer from "./components/Timer";
import {StoreProvider} from './_Store';


export default function App() {
  return (
    <Router basename="ttstats">
      <StoreProvider>
        <div id="header">
          <ul>
            <li><Link to="/">Servers Status</Link></li>
            <li><Link to="?playersfinder">Players Finder</Link></li>
            <li><Link to="?player">N/A</Link></li>
            <li><Link to="?vehicles">Vehicle Stats</Link></li>
            <li><Link to="?jobs">Jobs Stats</Link></li>
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
                case ("?player"):
                  return <div>player</div>;
                case ("?jobs"):
                  return <JobsStats/>;
                case ("?vehicles"):
                  return <VehicleStats/>;
                case ("?playersfinder"):
                  return <PlayersFinder url={url}/>;
                default:
                  return <Redirect to="/?status"/>;
              }
            }}/>
        </div>

        <div id="footer">
          <Timer/>
        </div>
      </StoreProvider>
    </Router>
  );
}
