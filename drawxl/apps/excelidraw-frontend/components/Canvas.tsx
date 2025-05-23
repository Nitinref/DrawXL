import { initDraw } from "@/draw"
import { Socket } from "dgram";
import { useEffect, useState } from "react"
import { useRef } from "react";
import { IconButton } from "./IconButton";
import { Circle, Pencil, PencilIcon, RectangleEllipsis, RectangleHorizontal } from "lucide-react";

type Shape = "circle"| "rect" | "pencil";

export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket
    roomId: string
}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedTool , setSelectedTool] = useState<Shape>("circle")

    useEffect(()=>{
    // @ts-ignore
    window.selectedTool = selectedTool;
    },[selectedTool])

    

    useEffect(() => {

        if (canvasRef.current) {
            initDraw(canvasRef.current, roomId, socket)

        }
    }, [canvasRef])

    return (
        <div style={{
            height: "100%",
            overflow: "hidden"
        }}>
        
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} ></canvas>
            <Topbar setSelectedTool={setSelectedTool}  selectedTool={selectedTool} />
            
        </div>
    )
}


function Topbar({selectedTool , setSelectedTool}:{
    selectedTool :Shape,
    setSelectedTool:(s:Shape) => void;
}) {
    return <div style={{
        position: "fixed",
        top: 10,
        left: 10
    }}>
        <div className="h-[70px] w-full bg-blue-300 bg-white/15 backdrop-blur-sm z-10 shadow-md flex justify-center items-center px-4 sm:px-8 rounded-lg mt-4 ]">
            <div className="gap-4 flex m-4  rounded-sm ">
                <IconButton onClick={()=>{
                  setSelectedTool("pencil")
                }} activated={selectedTool === "pencil"} icon={<PencilIcon />} />
                <IconButton onClick={()=>{
                  setSelectedTool("rect")
                  }}  activated={selectedTool === "rect"} icon={<RectangleHorizontal />} />
                <IconButton  onClick={()=>{
                  setSelectedTool("circle")
                  }}  activated={selectedTool === "circle"} icon={<Circle />} />
            </div>
        </div>
    </div>
}