import express from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import middleware from "./middleware"
import { CreateUserSchema, SigninSchema, CreateRoomSchema } from "@repo/common/types";
import { Client } from "@repo/db/client"
import { date } from "zod";
const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {

    const ParsedData = CreateUserSchema.safeParse(req.body);
    if (!ParsedData.success) {
        res.json({
            message: "incorrect credential "
        })
        return
    }
    try {
     const user  =  await Client.user.create({
            data: {
                username: ParsedData.data?.username,
                password: ParsedData.data.password,
                name: ParsedData.data.name
            }

        })


        res.json({
            message: "user signup",
           userId : user.id
        })

    } catch (e) {
        res.status(411).json({
            message: "User allready exist with this username"
        })
    }
})

app.post("/signin", async function (req, res) {


    const ParsedData = SigninSchema.safeParse(req.body);
    if (!ParsedData.success) {
        res.json({
            message: "incorrect credential "
        })
        return
    }

    const user  = await Client.user.findFirst({
        where :{
            username: ParsedData.data.username,
            password:ParsedData.data.password
        }
    }) 


    if(!user){
        res.status(403).json({
            message:"Not authorized"
        })
        return;
    }

    const token = jwt.sign({
        userId :user?.id
    }, JWT_SECRET)

    res.json({
        token   
    })

})

app.post("/room", middleware, async function (req, res) {

    const ParsedData = CreateRoomSchema.safeParse(req.body);
    if (!ParsedData.success) {
        res.json({
            message: "incorrect credential "
        })
        return
    }
// @ts-ignore
    const userId = req.userId;
  try{
    const room = await Client.room.create({
        data:{
            slug:ParsedData.data.name,
            adminId:userId
        }
    })

    //middleware logic should be written before using it 
    res.json({
        roomId: room.id
    })
}catch(e){
    res.status(411).json({
      message:"room allready existed with this slug"
    })
}
})
app.get("/chats/:roomId" , async (req,res) =>{
    const  roomId =Number( req.params.roomId);
 const messages = await   Client.chat.findMany({
        where:{
            roomId: roomId
        },
        orderBy:{
            id:"desc"
        },
        take:50
    })
    res.json({
        messages
    })
})


app.listen(4000)