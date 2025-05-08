import express from "express";
import jwt from "jsonwebtoken";
import z from "zod";
import { JWT_SECRET } from "./config";
import middleware from "./middleware";
const app = express();


app.post("/signup" , function(req,res){
      
    const userID = 1;


    res.json({
        message:"user signup"
    })
})

app.post("/signin" , function(req,res){
    
    const userID = 1;

    const token = jwt.sign({
        userID
    },JWT_SECRET)

    res.json({
        token
    })

})

app.post("/room"  ,middleware, function(req ,res ){
 
    //middleware logic should be written before using it 
   res.json({
    roomId:"4001"
   })
})