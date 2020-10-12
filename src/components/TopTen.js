import React, { useState, useEffect } from "react";

const top10_job_names = {
	"firefighter_streak_record": {
        name: "Firefighter Mission Streak"
    },
	"omni_void_leaderboard": {
        name: "Omni Void",
        prepend: "$"
    },
	"ems_streak_record": {
        name: "EMS Mission Streak"
    },
	"houses_crafted": {
        name: "Most Houses Constructed"
    },
	"toll_paid": {
        name: "Tolls Paid"
    },
	"drops_collected": {
        name: "Drops Collected"
    }
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
    
    return (<div class="with-table">
                <h2>Top 10 Leaderboards</h2>
                {state.loading && <h2>Loading</h2>}
                {state.error && <h2>Error {state.error === null ? "" : "- " + state.error} </h2>}
                {state.data && <> {
                    Object.entries(state.data).map(leaderboard => <div key={leaderboard[0]}>
                        <div id="split"/>
                        <h2>{top10_job_names[leaderboard[0]] ? top10_job_names[leaderboard[0]].name : leaderboard[0]}</h2>
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
                                            <td>{top10_job_names[leaderboard[0]] && top10_job_names[leaderboard[0]].prepend ? top10_job_names[leaderboard[0]].prepend : ""}{Number(player.amount).toLocaleString()}</td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    </div>)}
                    <h3>Leaderboards updates every hour<br/>Last Updated: {new Date(state.timestamp).toTimeString()}</h3>
                    </>
                }
            </div>);
}