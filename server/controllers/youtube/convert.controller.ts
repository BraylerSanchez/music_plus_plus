import { ConvertModel } from '../../models/youtube/convert.model';
import { Request, Response} from 'express'

export class ConvertController{
    convertModel: ConvertModel;
    
    constructor(){
        this.convertModel = new ConvertModel();
    }
    
    toStream(req:Request, res:Response){   
        var videoId = req.params['videoId'];
        try{
            var stream = this.convertModel.toStream(videoId);
            stream.on('response', function (streamRes) {
                var totalSize = streamRes.headers['content-length'];
                res.setHeader('Content-Type', 'audio/mpeg');
                res.setHeader('Accept-Ranges', `bytes 0-${totalSize}`);
                stream.pipe(res);
                var dataRead = 0;
                streamRes.on('data', function (data) {
                    dataRead += data.length;
                    var percent = dataRead / totalSize;
                    //process.stdout.write((percent * 100).toFixed(2) + '% ');
                });
                streamRes.on('end', function () {
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