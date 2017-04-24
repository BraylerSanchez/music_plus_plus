import { IUser } from '../../interfaces/user/user.interface'
export class UserModel implements IUser{
    _id: string;
    user_name: string;
    avatar_url: string;
    name: string;
    last_name: string;
    constructor(){
        delete this._id;
    }
}