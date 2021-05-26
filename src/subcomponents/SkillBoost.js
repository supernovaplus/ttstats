import React, { useState, useEffect } from "react";

export default function SkillBoost () {
    const [ state, setState ] = useState(null)

    useEffect(()=>{
        let isSubscribed = true;
        fetch("https://novaplus-api.herokuapp.com/skillboost").then(res=>res.json()).then(res=>{
            if (isSubscribed){
                if(!res.data){
                    setState(() => "-");
                }else{
                    setState(() => `${res.data.skill} +${res.data.bonus}% exp`);
                }
            }
        }).catch(err=>{
            if (isSubscribed) {
                console.log(err);
                setState(() => "-");
            }
        });

        return () => {
            isSubscribed = false;
        }
    }, [])

    return (<h3>Current skill boost: {state || "?"}</h3>)
}