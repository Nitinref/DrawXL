"use client"

import {TextInput} from "@repo/ui/text-input"
import styles from "./page.module.css";
import { useRouter } from "next/navigation";

export default function Home(){
  
  const router = useRouter();

  return (
    <div style={{height:"100vh" , width:"100vw" , background:"black" , display:"flex"  , justifyContent:"center",justifyItems:"center"}}>
         <div style={{display:"flex" , justifyContent:"center", flexDirection:"column"}}>
        
        <TextInput   placeholder="end the room" size="big"></TextInput>
        <button style={{padding:"10px" , fontSize:"10px" ,border:"2px . solid , black" , borderRadius:"24px" }}  onClick={()=>{
          router.push("/chat/123")
        }}>Join us</button>
         </div>
  </div>)
}