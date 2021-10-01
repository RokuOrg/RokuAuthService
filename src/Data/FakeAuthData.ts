import {AuthDataModel} from "./DataModels";
import {User} from '../entity/User'

let Users : User[] = [];

export class FakeAuthData implements AuthDataModel{
    GetByEmailOrName(name: string, email: string): Promise<User> {
        let user : User = Users.find( x => x.name == name || x.email == email)
        return Promise.resolve(user)
    }

    GetById(Id: string): Promise<User> {
        let user : User = Users.find( x => x.id == Id)
        return Promise.resolve(user);
    }

    SaveUser(user: User): Promise<void> {
        Users.push(user)
        return Promise.resolve();
    }
}