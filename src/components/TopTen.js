import React, { useState, useEffect } from "react";

function TopBlock({board, index, savedStatus}) {
    const [isOpen, setOpenStatus] = useState(savedStatus[index] === true || (index === 0 && !(index in savedStatus)));

    function handleChanges(){
        savedStatus[index] = !isOpen;
        localStorage.setItem("top10", JSON.stringify(savedStatus));
        setOpenStatus(() => !isOpen);
    }

    return (
        <div>
            <h2 className="dxpcursor noselect hov" onClick={handleChanges}>{board.title}</h2>
            { isOpen === true &&
                <table>
                    <tbody>
                    <tr>
                        <th>#</th>
                        {board.labels.map((label, index2)=><th key={index2}>{label}</th>)}
                    </tr>

                    {board.rows.map((row, index2) => 
                        <tr key={index2} title={row[0]}>
                            <td>{index2+1}</td>
                            {board.rows[index2].slice(1).map((column, index3) => <td key={index3}>{column}</td>)}
                        </tr>
                    )}
                    </tbody>
                </table>
            }
        </div>
    )
}

export default function Top10 () {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null,
        timestamp: 0
    });

    const savedStatus = state.loading === false && localStorage.getItem("top10") ? JSON.parse(localStorage.getItem("top10")) : {};

    useEffect(()=>{
        let isSubscribed = true;
        fetch("https://aca.lt/api_v1/top10.json")
        .then(res=>res.json())
        .then(res=>{
            if (isSubscribed){
                setState(s => ({ ...s, 
                    loading: false,
                    ...res}))
            }
        }).catch(err=>{
            if (isSubscribed) {
                console.log(err);
                setState(s => ({...s, 
                                error: "Failed to load the data, try again later.", 
                                loading: false}))
                }
        })
        return () => {
            isSubscribed = false;
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (<div className="with-table">
                <h2>Top 10 Leaderboards</h2>
                <div id="split"/>
                {state.loading && <h2>Loading</h2>}
                {state.error && <h2>Error {state.error === null ? "" : "- " + state.error} </h2>}
                {state.data && 
                    <> 
                        {state.data.map((board, index) => <TopBlock key={index} board={board} index={index} savedStatus={savedStatus}/>)}
                        <h3>Leaderboards updates every hour<br/>Last Updated: {new Date(state.timestamp).toTimeString()}<br/>*Data collected since November 12, 2020</h3>
                    </>
                }
            </div>);
}