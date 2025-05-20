import { useEffect, useState } from "react";
import { WS_URL } from "../app/config";

export function useSocket(){
    const [socket ,setSocket] = useState<WebSocket>()    
    const [loading , setLoading] = useState(true)


    useEffect(()=>{

        const ws = new WebSocket(`${WS_URL}?token=`);
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