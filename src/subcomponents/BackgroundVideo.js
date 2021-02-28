import React, { useRef, useEffect } from "react";
import PageVisibility from 'react-page-visibility';

export default function BackgroundVideo () {
    const ref = useRef(null);

    useEffect(()=>{
        if(ref.current){
            ref.current.currentTime = Math.floor(Math.random()*40);
        }
    },[ref])

    const visiblityChanged = isVisible => {
        if(ref.current){
            if(isVisible){
                ref.current.play();
            }else{
                ref.current.pause();
            }
        }
    };

    return  window.innerWidth < 800 ? <div id="myVideo" style={{backgroundImage: "url('media/nova-bg-pic-1.jpg')", backgroundSize: "cover"}}></div> : 
                <PageVisibility onChange={visiblityChanged}>
                    <video autoPlay muted loop id="myVideo" ref={ref}>
                        <source src="media/nova-bg-vid-1.mp4" type="video/mp4"/>
                    </video>
                </PageVisibility>
}
