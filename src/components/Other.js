import React, { useState, useEffect } from "react";

export default function Other() {
    // const [currentPageId, setPageId] = useState(0);

    // const click = ({target}) => {
    //     console.log(target);
    //     //setPageId(pageid => pageid + 1);
    // }
    const myRef = React.createRef();

    const onLoadIframe = ({target}) => {
        // target.style.display = "block"
        myRef.current.style.display = "none";
        target.style.display = "block";
        console.log("loaded", myRef.current);
    }

    return (
        <div>
            <h2 ref={myRef}>Loading</h2>
            {/* <iframe src="https://uptime.ttstats.aca.lt/" title="uptime.ttstats" id="uptime-iframe" alt="loading" onLoad={onLoadIframe}></iframe> */}
            <iframe src="https://uptime.ttstats.aca.lt/" title="uptime.ttstats" id="uptime-iframe" alt="loading" onLoad={onLoadIframe} style={{"display": "none"}}></iframe>
            {/* <div id="header">
                <ul>
                    <li><button pageid={1} onClick={click}>test</button></li>
                </ul>
            </div>

            <div>test {currentPageId} --</div> */}

        </div>
    );
}
