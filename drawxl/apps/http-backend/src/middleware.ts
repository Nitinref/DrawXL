import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";
import { Request,response,NextFunction } from "express";
import { any } from "zod";


export default function(req:Request , res:Response, next:NextFunction){
  
    const token = req.headers["authorization"] ?? "";
    
    const decoded = jwt.verify(token , JWT_SECRET);

    if(decoded){
        // @ts-ignore
        req.userId = decoded.userId;
    }else{
        // @ts-ignore
       res.status(401).json({
         message:"unauthorized accesss"
       })
    }


}