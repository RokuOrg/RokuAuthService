import express, { Request, Response } from "express";
import {BaseUser,LoginUser} from "../models/User.interface";
import {getRepository} from "typeorm";
import {User} from "../entity/User"
import {Message} from "../models/Message";
import {AuthData} from "../Data/AuthData";
import{AuthLogic} from "../logic/AuthLogic";

export const userRouter = express.Router();

let authLogic = new AuthLogic(new AuthData())

userRouter.get("/", async (req: Request, res: Response) => {
    try {
        let users: User[] = await getRepository(User).find()

        res.status(200).json(users);
    } catch (e){
        res.status(500).send(e);
    }
});

userRouter.post("/register", async (req: Request, res: Response) => {
    try{
        const regUser: BaseUser = req.body;
        let resp : Message = await authLogic.Register(regUser)

        res.status(200).json(resp)
    }catch (e){
        res.status(500).send(e)
    }
})

userRouter.post("/login", async (req: Request, res: Response) => {
    try{
        const user : LoginUser =req.body;

        let resp : Message = await authLogic.Login(user)

        res.status(200).json(resp)
    }catch (e){
        res.status(500).send(e)
    }
})

userRouter.get("/verify", async (req : Request, res : Response) => {
    try {
        let Token = req.header("X-JWT-Token")

        let resp : Message = await authLogic.Verify(Token)
        res.status(200).json(resp);
    } catch (e){
        res.status(500).send(e);
    }
})