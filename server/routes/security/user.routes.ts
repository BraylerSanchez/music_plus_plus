import { UserController } from '../../controllers/security/user.controller';
import {  Request, Response } from 'express'

export class UserRoutes{
    private userController: UserController;
    constructor(app:any){
        this.userController = new UserController();
        app.post('/api/v2/user/login',  (req:Request, res:Response) => this.userController.login(req, res) );
    }
}