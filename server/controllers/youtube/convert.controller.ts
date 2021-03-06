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
            stream.on('response', function (streamRes: any) {
                var totalSize = streamRes.headers['content-length'];
                res.setHeader('Content-Type', 'audio/mp3');
                res.setHeader('Accept-Ranges', `bytes 0-0/${totalSize}`);
                stream.pipe(res);
                var dataRead = 0;
                streamRes.on('data', function (data: any) {
                    dataRead += data.length;
                    var percent = dataRead / totalSize;
                });
                streamRes.on('end', function () {
                    process.stdout.write('\n');
                });
            });
            stream.on('error', (error:any) =>{
                res.send('Error al reproducir este mp3.')
            })
        }catch(error){
            res.send({
                status: false,
                message: error
            })
        }
    }
}