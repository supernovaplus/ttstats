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
import Footer from "./components/Footer";
import {StoreProvider} from './_Store';


export default function App() {
  React.useEffect(()=>{
    console.log("title")
    document.title = "ttstats.aca.lt";
  },[])

  return (
    <Router basename="/">
    {/* <Router basename="ttstats"> */}
      <StoreProvider>
        <div id="header">
          <ul>
            <li><Link to="/">Servers Status</Link></li>
            <li><Link to="?playersfinder">Players Finder</Link></li>
            <li><Link to="?vehicles">Vehicle Stats</Link></li>
            <li><Link to="?jobs">Jobs Stats</Link></li>
            <li><a href="http://ttmap.online" className="gold">ttmap.online</a></li>
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
          <Footer/>
        </div>
      </StoreProvider>
    </Router>
  );
}
