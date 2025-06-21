"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { IconButton } from "./IconButton";
import { MoveRight, Baseline, Circle, Eraser, Minus, PencilIcon, RectangleHorizontal, Hand } from "lucide-react";
import { Game } from "@/draw/Game";

export type Tool = "circle" | "rect" | "pencil" | "eraser" | "text" | "line" | "moveright" | "pan" | "sun";

export function Canvas({
    roomId,
    socket
}: {
    socket: WebSocket;
    roomId: string;
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [game, setGame] = useState<Game | null>(null);
    const [selectedTool, setSelectedTool] = useState<Tool>("circle");
    const [windowSize, setWindowSize] = useState({
        width: typeof window !== 'undefined' ? window.innerWidth : 0,
        height: typeof window !== 'undefined' ? window.innerHeight : 0
    });

    const handleToolChange = useCallback((tool: Tool) => {
        setSelectedTool(tool);
    }, []);

    useEffect(() => {
        // @ts-expect-error - Game's setTool method exists but TypeScript doesn't know about it
        game?.setTool(selectedTool);
    }, [selectedTool, game]);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight
            });
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        if (canvasRef.current) {
            const g = new Game(canvasRef.current, roomId, socket);
            setGame(g);

            return () => {
                g.destroy();
            };
        }
    }, [canvasRef, roomId, socket]);

    return (
        <div style={{
            height: "100%",
            overflow: "hidden"
        }}>
            <canvas 
                ref={canvasRef} 
                width={windowSize.width} 
                height={windowSize.height}
            />
            <Topbar 
                selectedTool={selectedTool} 
                setSelectedTool={handleToolChange} 
            />
        </div>
    );
}

function Topbar({ selectedTool, setSelectedTool }: {
    selectedTool: Tool;
    setSelectedTool: (s: Tool) => void;
}) {
    return (
        <div style={{
            position: "fixed",
            top: 10,
            left: 10
        }}>
            <div className="fixed h-[55px] left-1/2 bg-white/90 -translate-x-1/2 backdrop-blur-sm z-50 shadow-md flex justify-center items-center px-2 sm:px-2 rounded-lg mt-4">
                <div className="gap-4 flex m-4 rounded-sm transition-all duration-200">
                    <IconButton 
                        onClick={() => setSelectedTool("pencil")} 
                        activated={selectedTool === "pencil"} 
                        icon={<PencilIcon />} 
                    />
                    <IconButton 
                        onClick={() => setSelectedTool("rect")} 
                        activated={selectedTool === "rect"} 
                        icon={<RectangleHorizontal />} 
                    />
                    <IconButton 
                        onClick={() => setSelectedTool("circle")} 
                        activated={selectedTool === "circle"} 
                        icon={<Circle />} 
                    />
                    <IconButton 
                        onClick={() => setSelectedTool("eraser")} 
                        activated={selectedTool === "eraser"} 
                        icon={<Eraser />} 
                    />
                    <IconButton 
                        onClick={() => setSelectedTool("text")} 
                        activated={selectedTool === "text"} 
                        icon={<Baseline />} 
                    />
                    <IconButton 
                        onClick={() => setSelectedTool("line")} 
                        activated={selectedTool === "line"} 
                        icon={<Minus />} 
                    />
                    <IconButton 
                        onClick={() => setSelectedTool("moveright")} 
                        activated={selectedTool === "moveright"} 
                        icon={<MoveRight />} 
                    />
                    <IconButton 
                        onClick={() => setSelectedTool("pan")} 
                        activated={selectedTool === "pan"} 
                        icon={<Hand />} 
                    />
                </div>
            </div>
        </div>
    );
}