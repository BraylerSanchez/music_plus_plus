import { ConvertModel } from '../../models/youtube/convert.model';

export class ConvertController{
    convertModel: ConvertModel;
    
    constructor(){
        this.convertModel = new ConvertModel();
    }
    
    toStream(req, res){
        res.set({'Content-Type': 'audio/mpeg'});
        var videoId = req.params['videoId'];
        try{
            this.convertModel.toStream(videoId).pipe(res)
        }catch(error){
            res.send({
                status: false,
                message: error
            })
        }
    }
}