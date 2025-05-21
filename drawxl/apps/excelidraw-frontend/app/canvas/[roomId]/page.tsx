"use client"

import { RoomCanvas } from "@/components/RoomCanvas";
import { useEffect, useRef } from "react";


export default async function canvasRoom({params}:{
    params:{
        roomId:string
    }
}) {

    const roomId =  (await params).roomId;
    
    return  (
        <RoomCanvas roomId={roomId}  />
    )
}