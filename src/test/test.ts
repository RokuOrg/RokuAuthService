import {AuthLogic} from "../logic/AuthLogic";
import {FakeAuthData} from "../Data/FakeAuthData";
import {User} from '../entity/User'
import {LoginUser, BaseUser} from  '../models/User.interface'
import {Message} from "../models/Message"

let assert = require('assert');

let authData : FakeAuthData = new FakeAuthData()
let authLogic : AuthLogic = new AuthLogic(authData)
let user :  User = {
    id : "1",
    name : "2",
    email : "3",
    password : "4"
}

describe('Test Auth Logic',function (){
    before(function (){
        authData.SaveUser(user)
    })

    describe("Login Tests", function (){
        describe('Login Success', function (){
            it('Should return a success true and a token',  async function (){
                let loginUser : LoginUser = {
                    name : user.name,
                    password : user.password
                }
                let res : Message;
                await authLogic.Login(loginUser).then(x => {
                        res = x
                    }
                )
                assert.equal(res.succes, true)
            })
        })

        describe('login fail wrong password', function (){
            it('should return success false and wrong password error', async function (){
                let loginUser : LoginUser = {
                    name : user.name,
                    password : "wrong password"
                }
                let res : Message;
                await authLogic.Login(loginUser).then(x => {
                        res = x
                    }
                )
                assert.equal(res.succes, false)
            })
        })

        describe('login fail wrong name', function (){
            it('should return success false and wrong name error', async function (){
                let loginUser : LoginUser = {
                    name : "wrong name",
                    password : user.password
                }
                let res : Message;
                await authLogic.Login(loginUser).then(x => {
                        res = x
                    }
                )
                assert.equal(res.succes, false)
            })
        })
    })

    describe("Register Tests", function (){
        describe('Register Success', function (){
            it('Should return a success true and a token', async function (){
                let registerUser : BaseUser = {
                    name : "user",
                    email : "user@example.com",
                    password : "user123",
                }
                let res : Message;
                await authLogic.Register(registerUser).then(x =>{
                    res = x
                })
                if(!res.succes)
                    assert.fail(res.object)

                let user : User = await authData.GetByEmailOrName(registerUser.name, registerUser.email)
                assert(user != null)
            })
        })

        describe("Register Fail Name Used", function (){
            it('Should return a success false and name error', async function (){
                let registerUser : BaseUser = {
                    name : "2",
                    email : "user@example.com",
                    password : "user123",
                }
                let res : Message;
                await authLogic.Register(registerUser).then(x =>{
                    res = x
                })
                assert(!res.succes)
            })
        })

        describe("Register Fail Email Used", function (){
            it('Should return a success false and email error', async function (){
                let registerUser : BaseUser = {
                    name : "abcdef",
                    email : "3",
                    password : "user123",
                }
                let res : Message;
                await authLogic.Register(registerUser).then(x =>{
                    res = x
                })
                assert(!res.succes)
            })
        })
    })
})