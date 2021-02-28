import React, { useState, useEffect } from "react";

export default function Top10 () {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null,
        timestamp: 0
    });

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
                {state.data && <> {
                        state.data.map((board, index) => <div key={index}>
                            {/* <div id="split"/> */}
                            <h2>{board.title}</h2>
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
                        </div>)
                        }
                    <h3>Leaderboards updates every hour<br/>Last Updated: {new Date(state.timestamp).toTimeString()}<br/>*Data collected since November 12, 2020</h3>
                    </>
                }
            </div>);
}