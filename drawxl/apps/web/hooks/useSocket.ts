import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [socket ,setSocket] = useState<WebSocket>()    
    const [loading , setLoading] = useState(true)


    useEffect(()=>{

        const ws = new WebSocket(`${WS_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI1NDA0N2VkMS0yNmIwLTQ1OGQtODk2Zi1hN2E5ZjU2M2FjNjAiLCJpYXQiOjE3NDcxMjM3Nzd9.EwU8aLPr0OQ6DitUuyiwp-H9zh5fSvhMTklQNPR6lMw`);
        ws.onopen = () =>{
            setLoading(false);
            setSocket(ws)
        }
    },[])


    return {
        socket,
        loading
    }
}