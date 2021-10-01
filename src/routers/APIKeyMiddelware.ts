import {NextFunction, Request, Response} from "express";

const APIkey = process.env.ROKU_AUTH_API_KEY

export function APIKeyMiddelware(request: Request, response: Response, next: NextFunction){
    if(request.params["apikey"] === APIkey){
        next()
    }else{
        response.status(400).send("Invalid API Key")
    }
}