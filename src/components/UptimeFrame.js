import React from "react";
// import React, { useContext } from "react";
// import { StoreContext } from "../data/store";

export default function UptimeFrame(props) {
    // const store = useContext(StoreContext);
    const myRef = React.createRef();
    const urlprop = parseInt(props.url[1])

    const onLoadIframe = ({target}) => {
        myRef.current.style.display = "none";
        target.style.display = "block";
        console.log("loaded", myRef.current);
    }

    return (
        <div>
            <h2 ref={myRef}>Loading</h2>
            <iframe src={"https://uptime.ttstats.aca.lt/" + (!urlprop || isNaN(urlprop) ? "" : urlprop)} title="uptime.ttstats" id="uptime-iframe" alt="loading" onLoad={onLoadIframe} style={{"display": "none"}}></iframe>
        </div>
    );
}
