import { initDraw } from "@/draw"
import { Socket } from "dgram";
import { useEffect } from "react"
import { useRef } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, PencilIcon, RectangleEllipsis, RectangleHorizontal } from "lucide-react";
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
            <Topbar />
        </div>
    )
}


function Topbar() {
    return  <div style={{
        position:"fixed",
        top:10,
        left:10
    }}>
        <IconButton icon={<PencilIcon />}  onClick={()=>{}}/>
        <IconButton icon={<RectangleHorizontal className=""/>}  onClick={()=>{}}/> 
        <IconButton icon={<Circle />}  onClick={()=>{}}/>


    </div>
}