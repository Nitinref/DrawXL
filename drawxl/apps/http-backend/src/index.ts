import express from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import { JWT_SECRET } from "@repo/backend-common/config";
import middleware from "./middleware";
import {CreateUserSchema , SigninSchema , CreateRoomSchema} from "@repo/common/types"
const app = express();


app.post("/signup" ,(req,res) => {
      
    const data = CreateUserSchema.safeParse(req.body);
    if(!data.success){
     res.json({
            message:"incorrect credential "
        })
        return
    }


    res.json({
        message:"user signup"
    })
})

app.post("/signin" , function(req,res){
    

      const data = SigninSchema.safeParse(req.body);
    if(!data.success){
     res.json({
            message:"incorrect credential "
        })
        return
    }

    const userID = 1;

    const token = jwt.sign({
        userID
    },JWT_SECRET)

    res.json({
        token
    })

})

app.post("/room"  ,middleware, function(req ,res ){
 
      const data = CreateRoomSchema.safeParse(req.body);
    if(!data.success){
     res.json({
            message:"incorrect credential "
        })
        return
    }

    //middleware logic should be written before using it 
   res.json({
    roomId:"4001"
   })
})