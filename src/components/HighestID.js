import React, { useContext } from "react";
import { StoreContext } from "../store";

export default function HighestID () {
    const store = useContext(StoreContext);

    let players_list = [];

    store.state.servers.forEach((server, index) => {
        if(server.playersData) players_list.push(...server.playersData);
    });

    players_list = players_list
                    .sort((a,b) => b[2] - a[2])
                    .map((player, index) => ({
                            index: index+1, 
                            name: player[0], 
                            id: player[2]
                        }));

    let final_list = players_list.length > 25 ? 
                        [
                            ...players_list.splice(0, 10),
                            {
                                index: '...', 
                                name: '...', 
                                id: '...'
                            },
                            ...players_list.splice(players_list.length-10)
                        ] : players_list;

    if(store.state.inited === false){
        return <h2>Loading</h2>;
    }else{
        return (
            <div>
                <h3>Highest player id based on current players on the server</h3>
                <table>
                    <tbody>
                        <tr><th>#</th><th>Name</th><th>ID</th></tr>
                        {final_list.length === 0 ? <tr><th></th><th>No Players Found</th><th></th></tr> : 
                        
                            final_list.map((player, index) => (
                                <tr key={index} style={index === 0 ? {fontSize: '2em'} : {}}>
                                    <td>#{player.index}</td>
                                    <td><b>{player.name ? player.name : "?"}</b></td>
                                    <td>{player.id}</td>
                                </tr>
                            ))
                        }

                    </tbody>
                </table>
            </div>
        );
    }
}