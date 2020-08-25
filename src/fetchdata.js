import servers_list from "./serverslist.json";

const timeout = promise => new Promise(function(resolve, reject) {
    setTimeout(() => reject(new Error("timeout")), 2000);
    promise.then(resolve, reject);
});

export const initAllServers = () => dispatch => {
    dispatch({type: "CLEARSERVERSLIST"})

    servers_list.forEach((server,index) => {
        dispatch({
            type: "ADDSERVER",
            data: {
                "error": null,
                "isLoaded": false,
                "ip": server[0],
                "name": server[1],
                "playersData": null,
                "serverData": null,
                "lastUpdate": null,
                "vehicleData": null
            },
            index
        })
        fetchServer(server,index)(dispatch);
    });

    dispatch({type: "SERVERSINITED"});
};

export const fetchServer = (server,index) => dispatch => {
    timeout( fetch("http://"+server[0]+"/status/widget/players.json").then(res => res.json()) ).then(res => {
            res.players.forEach(player=>{if(player[5] === "") player[5] = "Unemployed";});
            
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
        },() => {
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

export const fetchDetailedServer = (server, index) => dispatch => {
    timeout(
        fetch("http://"+server.ip+"/status/map/positions.json")
        .then(res => res.json()))
        .then(res => {
            dispatch({
                type: "UPDATESERVER",
                data: {
                    vehicleData: res.players.map(player=>player[4])
                },
                index
            });
    }).catch((err)=>console.log(err))
}