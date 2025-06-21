
import { useEffect, useState } from "react"
import { useRef } from "react";
import { IconButton } from "./IconButton";
import { MoveRight, Baseline, Circle, Eraser, Minus, PencilIcon, RectangleHorizontal,  Hand,  } from "lucide-react";
import { Game } from "@/draw/Game";



export type Tool = "circle" | "rect" | "pencil" | "eraser" | "text" | "line" | "moveright" | "pan"|"sun";

export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket
    roomId: string
}) {

    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game>()
    const [selectedTool, setSelectedTool] = useState<Tool>("circle")


    useEffect(() => {
        // @ts-expect-error

        game?.setTool(selectedTool)
    }, [selectedTool, game])

    useEffect(() => {

        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g)

            return () => {
                g.destroy()
            }

        }
    }, [canvasRef])

    return (
        <div style={{
            height: "100%",
            overflow: "hidden"
        }}>

            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} ></canvas>
            <Topbar setSelectedTool={setSelectedTool} selectedTool={selectedTool} />

        </div>
    )
}


function Topbar({ selectedTool, setSelectedTool }: {
    selectedTool: Tool,
    setSelectedTool: (s: Tool) => void;
}) {
    return <div style={{
        position: "fixed",
        top: 10,
        left: 10
    }}>
        <div className="fixed h-[55px] left-1/2   bg-white/90  -translate-x-1/2 backdrop-blur-sm z-50  shadow-md flex justify-center items-center px-2 sm:px-2 rounded-lg mt-4 ]">
            <div className="gap-4 flex m-4  rounded-sm  transition-all duration-200">
                <IconButton onClick={() => {
                    setSelectedTool("pencil")
                }} activated={selectedTool === "pencil"} icon={<PencilIcon />} />
                <IconButton onClick={() => {
                    setSelectedTool("rect")
                }} activated={selectedTool === "rect"} icon={<RectangleHorizontal />} />
                <IconButton onClick={() => {
                    setSelectedTool("circle")
                }} activated={selectedTool === "circle"} icon={<Circle />} />

                <IconButton onClick={() => {
                    setSelectedTool("eraser")
                }} activated={selectedTool === "eraser"} icon={<Eraser />} />

                <IconButton onClick={() => {
                    setSelectedTool("text")
                }} activated={selectedTool === "text"} icon={<Baseline />} />
                <IconButton onClick={() => {
                    setSelectedTool("line")
                }} activated={selectedTool === "line"} icon={<Minus />} />
                <IconButton onClick={() => {
                    setSelectedTool("moveright")
                }} activated={selectedTool === "moveright"} icon={<MoveRight />} />
                <IconButton onClick={() => {
                    setSelectedTool("pan")
                }} activated={selectedTool === "pan"} icon={<Hand/>} />
            
            </div>
        </div>
    </div>
}