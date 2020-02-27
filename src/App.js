import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import ServersStatus from "./ServersStatus";
import ServerDetails from "./ServerDetails";
import PlayersFinder from "./PlayersFinder";
import JobsStats from "./JobsStats";
import Timer from "./Timer";
import {StoreProvider} from './_Store';
import "./App.css";

export default function App() {
  return (
    <Router basename="ttstats">
      <StoreProvider>
      
      <header>
        <ul>
          <li><Link to="/">Servers Status</Link></li>
          <li><Link to="?playersfinder">Players Finder</Link></li>
          <li><Link to="?player">N/A</Link></li>
          <li><Link to="?jobs">Jobs Stats</Link></li>
        </ul>
      </header>

      <main>
        <Route component={
          (props)=>{
            const url = props.location.search.split("=");
            switch(url[0]){
              case ("?status"):
                // return <div>test</div>
                return <ServersStatus/>;
              case ("?serverinfo"):
                  return <ServerDetails url={parseInt(url[1])}/>;
              case ("?player"):
                return <div>player</div>;
              case ("?jobs"):
                return <JobsStats/>;
              case ("?playersfinder"):
                return <PlayersFinder/>;
              default:
                return <Redirect to="/?status"/>;
            }
          }}/>
      </main>
      <footer>
        <Timer/>
      </footer>
      </StoreProvider>
    </Router>
  );
}
