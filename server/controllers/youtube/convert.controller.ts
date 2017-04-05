import { ConvertModel } from '../../models/youtube/convert.model';
import { Request, Response} from 'express'

export class ConvertController{
    convertModel: ConvertModel;
    
    constructor(){
        this.convertModel = new ConvertModel();
    }
    
    toStream(req:Request, res:Response){
        res.set({'Content-Type': 'audio/mpeg'});
        var videoId = req.params['videoId'];
        try{
            var stream = this.convertModel.toStream(videoId);
            stream.pipe(res);
            stream.on('response', function(streamRes:any) {
              var totalSize = streamRes.headers['content-length'];
              var dataRead = 0;
              res.on('data', function(data:any) {
                dataRead += data.length;
                var percent = dataRead / totalSize;
                
                process.stdout.write((percent * 100).toFixed(2) + '% ');
              });
              res.on('end', function() {
                process.stdout.write('\n');
              });
            });
        }catch(error){
            res.send({
                status: false,
                message: error
            })
        }
    }
}