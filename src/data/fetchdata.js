import servers_list from "./serverslist.json";

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

export const fetchServer = (server_endpoint, index) => async dispatch => {
    const controller = new AbortController();
    setTimeout(() => { controller.abort(); }, 3000)

    fetch(`https://tycoon-${server_endpoint}.users.cfx.re/status/widget/players.json`, { signal: controller.signal })
    .then(res => res.json())
    .then(res => {
        if(!("server" in res)) throw new Error();
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
    }).catch(() => {
        setTimeout(() => { controller.abort(); }, 5000)

        fetch(`https://servers-frontend.fivem.net/api/servers/single/${server_endpoint}`, { signal: controller.signal })
        .then(res => res.json())
        .then(res => {
            if(!("Data" in res)) throw new Error();
            const data = res["Data"];
            dispatch({
                type: "UPDATESERVER",
                data: {
                    isLoaded: true,
                    playersData: data.players.map(player => [
                        player.name,
                        -1,
                        "?",
                        null,
                        false,
                        "?",
                        false
                    ]),
                    serverData: {
                        "limit": data["sv_maxclients"],
                        "beta": "",
                        "dxp": [false],
                        "uptime": data["vars"]["Uptime"],
                        "region": "?",
                        "number": "?",
                        "name": "",
                        "motd": ""
                    },
                    lastUpdate: Date.now()
                },
                index
            })
            
        }).catch((err) => {
            dispatch({
                type: "UPDATESERVER",
                data: {
                    isLoaded: true,
                    error: true,
                    lastUpdate: Date.now()
                },
                index
            })
        });
    });


    // fetch(`https://servers-live.fivem.net/api/servers/single/${server_endpoint}`).then(res=>res.json).then(res=>{
    //     dispatch({
    //         type: "UPDATESERVER",
    //         data: {
    //             isLoaded: true,
    //             playersData: [],
    //             serverData: {"limit":32,"beta":"","dxp":[false],"uptime":"14h 57m","region":"EU","number":"6","name":"","motd":""},
    //             lastUpdate: Date.now()
    //         },
    //         index
    //     })
    // }).catch(err=>{

    // })


    // dispatch({
    //     type: "UPDATESERVER",
    //     data: {
    //         isLoaded: true,
    //         error: true,
    //         lastUpdate: Date.now()
    //     },
    //     index
    // })
}