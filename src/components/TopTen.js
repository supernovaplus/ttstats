import React, { useState, useEffect } from "react";

const top10_job_names = {
	"firefighter_streak_record": "Firefighter Streak Record",
	"omni_void_leaderboard": "Omni Void Leaderboard",
	"ems_streak_record": "EMS Streak Record",
	"houses_crafted": "Houses Crafted",
	"toll_paid": "Tolls Paid",
	"drops_collected": "Drops Collected"
};

export default function Top10 () {
    const [state, setState] = useState({
        loading: true,
        error: null,
        data: null,
        timestamp: 0
    });

    useEffect(()=>{
        fetch("https://novaplus.herokuapp.com/top10")
        .then(res=>res.json())
        .then(res=>{
            console.log(state);
            setState(s => ({ ...s, 
                            loading: false,
                            ...res}))
        })
        .catch(err=>{
            console.log(err);
            setState(s => ({...s, error: "Failed to load the data"}))
        })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    
    return (<div id="top-ten">
                <h2>Top 10 Leaderboards</h2>
                    {state.loading && <h2>Loading</h2>}
                    {state.error && <h2>Error {state.error === null ? "" : "- " + state.error} </h2>}
                    {state.data && Object.entries(state.data).map(leaderboard => <div key={leaderboard[0]}>
                            <div id="split"/>
                            <h2>{top10_job_names[leaderboard[0]] ? top10_job_names[leaderboard[0]] : leaderboard[0]}</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>#</th>
                                        <th>Player</th>
                                        <th>Score</th>
                                    </tr>
                                    
                                    {!leaderboard[1] || leaderboard[1].length === 0 ? 
                                        <tr>
                                            <td>-</td>
                                            <td>N/A</td>
                                            <td>-</td>
                                        </tr> : 

                                        leaderboard[1].map((player, index) => 
                                            <tr key={index} title={player.username + "#" + player.user_id}>
                                                <td>{index+1}</td>
                                                <td>{player.username}</td>
                                                <td>{Number(player.amount).toLocaleString()}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>)
                    }
            </div>);
}