import { ConvertController } from '../../controllers/youtube/convert.controller';

export class ConvertRoutes{
    private convertController: ConvertController;
    constructor(app:any){
        this.convertController = new ConvertController();
        app.get('/api/v1/youtube/convert/:videoId', (req, res) => this.convertController.toStream(req, res));
    }
}