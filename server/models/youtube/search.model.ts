import { defer } from 'q';
import * as request from 'request';
import * as config from 'config';

export class SearchModel{
    private apiPart: string;
    private resultLength: number;
    private apiKey: string;
    
    constructor(){
        this.apiPart = 'snippet';
        let youtubeParams = config.get('youtubeParams');
        this.apiKey = youtubeParams['apiKey'];
        this.resultLength = youtubeParams['resultLength'];
    }
    
    search(query){
        var def = defer();
        request({
            method: 'GET',
            url: `https://www.googleapis.com/youtube/v3/search?part=${this.apiPart}&maxResults=${this.resultLength}&q=${query}&key=${this.apiKey}&type=video&videoDuration=short`,
            headers: {
               'Content-Type': 'application/json'
            }
        }, (error, res, data) =>{
            if(error){
                def.reject( error )
            }else{
                var shortSongs = JSON.parse( data).items.map( (video) => {
                    return {
                        title: video.snippet.title,
                        description: video.snippet.description,
                        channel: video.snippet.channelTitle,
                        thumbnail: video.snippet.thumbnails.default.url,
                        dateAt: video.snippet.publishedAt,
                        id: video.id.videoId
                    };
                })
                request({
                    method: 'GET',
                    url: `https://www.googleapis.com/youtube/v3/search?part=${this.apiPart}&maxResults=${this.resultLength}&q=${query}&key=${this.apiKey}&type=video&videoDuration=medium`,
                    headers: {
                       'Content-Type': 'application/json'
                    }
                }, (error, res, data) =>{
                    if(error){
                        def.reject( error )
                    }else{
                        let longSongs = JSON.parse( data).items.map( (video) => {
                            return {
                                title: video.snippet.title,
                                description: video.snippet.description,
                                channel: video.snippet.channelTitle,
                                thumbnail: video.snippet.thumbnails.default.url,
                                dateAt: video.snippet.publishedAt,
                                id: video.id.videoId
                            };
                        })
                        var sounds = shortSongs.concat(longSongs);
                        def.resolve( sounds );
                    }
                })
            }
        })
        return def.promise;
    }
}
