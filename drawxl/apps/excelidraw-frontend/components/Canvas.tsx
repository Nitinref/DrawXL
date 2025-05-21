import { initDraw } from "@/draw"
import { Socket } from "dgram";
import { useEffect } from "react"
import { useRef } from "react";
export function Canvas({
    roomId,
    socket
}:{
    socket:WebSocket
    roomId:string
}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);



    useEffect(() => {

        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId , socket)

        }
    }, [canvasRef])

    return (
        <div style={{
            height:"100%",
            overflow:"hidden"
        }}>
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} ></canvas>
        </div>
    )
}