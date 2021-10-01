import {BaseUser, LoginUser} from "../models/User.interface";
import {User} from "../entity/User";
import {v4 as uuid} from "uuid";
import {Message} from "../models/Message";
import {decodeSession, encodeSession} from "./JWTLogic";
import {DecodeResult} from "../models/JWT.interface";
import {AuthData} from "../Data/AuthData";
import {AuthDataModel} from "../Data/DataModels";

const secret_key = process.env.ROKU_SECRET_KEY
let authData: AuthData;

export class AuthLogic {
    async Register(regUser: BaseUser): Promise<Message>{
        let testUser: User = await authData.GetByEmailOrName(regUser.name, regUser.email)

        if (testUser != null) {
            if (testUser.name == regUser.name)
                return new Message(false, {error: "username already in use", id: 2})

            return new Message(false, {error: "email already in use", id: 3})
        }
            let guid = uuid()
            let user: User = {
                id: guid,
                name: regUser.name,
                email: regUser.email,
                password: regUser.password,
            }
            await authData.SaveUser(user)

            let session = encodeSession( secret_key,{
                userId : user.id,
                dateCreated: Date.now()
            })
            return new Message(true, {token : session.token, username: user.name})
    }

    async Login(loginUser: LoginUser) :Promise<Message>{
        let testUser: User = await authData.GetByEmailOrName(loginUser.name, loginUser.name)

        if (testUser == null)
            return new Message(false, {error : "invalid username or email", id: 2})

        if(loginUser.password != testUser.password)
            return new Message(false,{error: "incorrect password", id: 1})

        let session = encodeSession( secret_key,{
            userId : testUser.id,
            dateCreated: Date.now()
        })

        return new Message(true, {token : session.token, username: testUser.name})
    }

    async Verify(Token : string) : Promise<Message>{
        const decodedSession: DecodeResult = decodeSession(secret_key, Token);

        let userId: string;
        if (decodedSession.type !== "invalid-token") {
            if (decodedSession.type !== "integrity-error") {
                userId = decodedSession.session.userId
            }
        }

        let user : User = await authData.GetById(userId)

        return new Message(true, {username: user.name})
    }

    constructor(_authData : AuthDataModel) {
        authData = _authData
    }
}

