import {getRepository} from "typeorm";
import {User} from "../entity/User";
import {AuthDataModel} from "./DataModels";



export class AuthData implements AuthDataModel{

    GetByEmailOrName(name: string, email: string): Promise<User> {
        return getRepository(User).findOne({where: [{email: name}, {name: email}]})
    }

    SaveUser(user: User): Promise<void> {
        getRepository(User).save(user)
        return
    }

    GetById(Id: string): Promise<User> {
        return getRepository(User).findOne({where: {id: Id}})
    }
}