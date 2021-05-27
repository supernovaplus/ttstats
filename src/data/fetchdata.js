import servers_list from "./serverslist.json";

const timeout = promise => new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("timeout")), 4000);
    promise.then(resolve, reject);
});

export const initAllServers = () => dispatch => {
    dispatch({type: "CLEARSERVERSLIST"})

    servers_list.forEach((server, index) => {
        dispatch({
            type: "ADDSERVER",
            data: {
                "error": null,
                "isLoaded": false,
                "name": server[0],
                "endpoint": server[1],
                "playersData": null,
                "serverData": null,
                "lastUpdate": null,
                "vehicleData": null,
            },
            index
        });

        fetchServer(server[1], index)(dispatch);
    });

    dispatch({type: "SERVERSINITED"});
};

export const fetchServer = (server_endpoint, index) => dispatch => {
    timeout(
        fetch(`https://tycoon-${server_endpoint}.users.cfx.re/status/widget/players.json`).then(res => res.json())).then(res => {
            if(res.server === undefined) throw Error();
            res.players.forEach(player=>{if(player[5] === "") player[5] = "Unemployed";});
            // res.server["dxp"] = [true, 'gasdg', 3600000 + (Math.random()*20000), 1]
            dispatch({
                type: "UPDATESERVER",
                data: {
                    isLoaded: true,
                    playersData: res.players,
                    serverData: res.server,
                    lastUpdate: Date.now()
                },
                index
            })
        }, () => {
            dispatch({
                type: "UPDATESERVER",
                data: {
                    isLoaded: true,
                    error: true,
                    lastUpdate: Date.now()
                },
                index
            })
        }
    ).catch(() => {
        dispatch({
            type: "UPDATESERVER",
            data: {
                isLoaded: true,
                error: true,
                lastUpdate: Date.now()
            },
            index
        })
})}