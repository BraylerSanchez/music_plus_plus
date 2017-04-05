var ytdl = require('ytdl-core')

export class ConvertModel{
    constructor(){
    }
    
    toStream(videoId:any){
        var stream = ytdl(`http://www.youtube.com/watch?v=${videoId}`,{
            quality: 'lowest',
            filter: function(format:any) { 
                return format.container === 'mp4';
            }
        });
        return stream;
    }
}