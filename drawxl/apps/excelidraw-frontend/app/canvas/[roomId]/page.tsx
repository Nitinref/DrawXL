"use client"

import { RoomCanvas } from "@/components/RoomCanvas";
import { request } from "http";
import { useEffect, useRef } from "react";


export default async function Canvas({params}:{
    params:{
        roomId:string
    }
}){
    const roomId = (await params).roomId;

    return(
        <div>
            <RoomCanvas roomId={roomId}/>
        </div>
    )
}