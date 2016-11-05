var ytdl = require('ytdl-core')

export class ConvertModel{
    constructor(){
    }
    
    toStream(videoId){
        return ytdl(`http://www.youtube.com/watch?v=${videoId}`,{
            quality: 'lowest',
            filter: function(format) { 
                return format.container === 'mp4';
            }
        });
    }
}