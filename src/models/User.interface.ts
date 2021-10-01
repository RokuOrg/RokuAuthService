export  interface LoginUser{
    password: string;
    name: string;
}

export interface BaseUser extends LoginUser{
    email: string;
}