var defer = require('q').defer
import * as request from 'request';
var config = require('config')

export class SearchModel{
    private yconfig:any = {};
    
    constructor(){
        this.yconfig = config.get('youtubeParams');
    }
    
    search(query:any){
        var def = defer();
        request({
            method: 'GET',
            url: `https://www.googleapis.com/youtube/v3/search?part=${this.yconfig['part']}&maxResults=${this.yconfig['length']}&q=${query}&key=${this.yconfig['key']}&type=${this.yconfig['type']}`,
            headers: {
               'Content-Type': 'application/json'
            }
        }, (error:any, res:any, data:any) =>{
            if(error){
                def.reject( error )
            }else{
                var sounds = JSON.parse( data).items.map( (video:any) => {
                    return {
                        title: video.snippet.title,
                        description: video.snippet.description,
                        channel: video.snippet.channelTitle,
                        thumbnail: video.snippet.thumbnails.default.url,
                        dateAt: video.snippet.publishedAt,
                        id: video.id.videoId
                    };
                })
                
                def.resolve( sounds );
            }
        })
        return def.promise;
    }
}