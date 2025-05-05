import express from "express"

const app = express()

app.get("/signup" , function(req,res){
    res.send("hi you are signeed up ")
})

app.get("/signin" , function(req,res){
    res.send("hi you are sign in ")
})

app.get("/chat" , function(req,res){
    res.send("hi you are sign in ")
})

app.listen(3000)