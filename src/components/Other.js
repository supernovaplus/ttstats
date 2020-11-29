import React, { useState, useEffect } from "react";

export default function Other() {
    const [currentPageId, setPageId] = useState(0);

    const click = ({target}) => {
        console.log(target);
        //setPageId(pageid => pageid + 1);
    }

    return (
        <div>
            <div id="header">
                <ul>
                    <li><button pageid={1} onClick={click}>test</button></li>
                </ul>
            </div>

            <div>test {currentPageId} --</div>

        </div>
    );
}
