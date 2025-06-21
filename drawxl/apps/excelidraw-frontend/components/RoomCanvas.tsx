"use client";

import { WS_URL } from "@/config";
import { useEffect, useState } from "react";
import { Canvas } from "./Canvas";

export function RoomCanvas({roomId}:{roomId:string}) {

    
    const [socket , setSocket] = useState<WebSocket | null>(null);
   

    useEffect(()=>{
         const token = localStorage.getItem("token")
      const ws = new WebSocket(`${WS_URL}?token=${token}`)

      ws.onopen = () =>{
        setSocket(ws);
         const data = JSON.stringify({
            type:"join_room",
            roomId
        })
        ws.send(data)
      }

    },[roomId])

    if(!socket){

        return <div>
            Connecting to the server...  
            
              </div>
    }

    return (
        <div>

            <Canvas roomId={roomId} socket={socket}/>
        </div>
    )
}

// pubsub is a state full connection means a single websocket serber cant handel  more thna10k user so me just make sure that we put  10k 10k and bundles of the user to the pubsub which act as a head of the websocket server
// ya you here right  scale up and scale down my server 
//  with the help off  cd pipeline or horizontal scallin and the vertical scalling 