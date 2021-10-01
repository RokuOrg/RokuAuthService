import {User} from "../entity/User";

export interface AuthDataModel{
    GetByEmailOrName(name : string, email:string) : Promise<User>

    SaveUser(user: User) : Promise<void>

    GetById(Id: string) : Promise<User>
}