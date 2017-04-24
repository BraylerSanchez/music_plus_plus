import { UserModel } from '../../models/security/user.model';
import { Request, Response} from 'express'

export class UserController{
    userModel: UserModel;
    
    constructor(){
        this.userModel = new UserModel();
    }
    
    login(req:Request, res:Response){
        var _user = req['body'];
        _user.createAt = new Date();
        
        this.userModel.login(_user).then( (user:any) =>{
            res.json({
                result: true,
                user: user
            })
        }).catch( (error:any) =>{
            res.send({
                result: false,
                message: error
            })
        })
    }
}