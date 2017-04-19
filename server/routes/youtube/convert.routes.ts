import { ConvertController } from '../../controllers/youtube/convert.controller';
import { Request, Response } from 'express'

export class ConvertRoutes{
    private convertController: ConvertController;
    constructor(app:any){
        this.convertController = new ConvertController();
        app.get('/api/v1/youtube/convert/:videoId', (req:Request, res:Response) =>
         this.convertController.toStream(req, res));
    }
}