import { ConvertController } from '../../controllers/youtube/convert.controller';
import { Server, Request, Response } from 'express'

export class ConvertRoutes{
    private convertController: ConvertController;
    constructor(app:Server){
        this.convertController = new ConvertController();
        app.get('/api/v1/youtube/convert/:videoId', (req:Request, res:Response) =>
         this.convertController.toStream(req, res));
    }
}