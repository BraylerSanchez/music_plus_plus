import * as mongoose from 'mongoose';
var defer = require('q').defer
import { PlayListSchema,  SharedPlaylistSchema} from '../../schemas/playlist/playlist.schema';

export class PlaylistModel{
    public playlistModelMG: any;
    public sharedPlaylistModel: any;
    
    constructor( ){
        this.playlistModelMG = mongoose.model('playlist', PlayListSchema)
        this.sharedPlaylistModel = mongoose.model('sharedPlaylist', SharedPlaylistSchema);
    }
    
    list( _userId:any ){
        var def = defer();
        this.playlistModelMG.find( {userAt: _userId}, (error:any, docs:any) =>{
            if( error ){
                def.reject( error );
            }else{
                def.resolve( docs )
            }
        });
        return def.promise;
    }
    
    get( _id:string ){
        var def = defer();
        this.playlistModelMG.find( {_id: _id}, (error:any, docs:any) =>{
            if( error ){
                def.reject( error );
            }else{
                def.resolve( docs )
            }
        });
        return def.promise;
    }
    
    delete( _id:string ){
        var def = defer();
        this.playlistModelMG.remove( {_id: _id}, (error:any) =>{
            if( error ){
                def.reject( error );
            }else{
                def.resolve( 'playlist delete success' )
            }
        });
        return def.promise;
    }
    
    save( _playlist:any){
        var def = defer();
        var playlist = new this.playlistModelMG( _playlist );
        playlist.save( (error:any, doc:any) =>{
            if (error) {
                def.reject(error)
            } else {
                def.resolve( "Playlist save success." );
            }
        });
        return def.promise;
    }
    
    update( _id:string, _playlist:any){
        var def = defer();
        this.playlistModelMG.update( {_id: _id}, _playlist, {}, (error:any, doc:any) =>{
            if (error) {
                def.reject(error)
            } else {
                def.resolve( "Playlist update success." );
            }
        });
        return def.promise;
    }
    
    share(_sharedPlaylist:any){
        var sharedPlaylist = new this.sharedPlaylistModel(_sharedPlaylist);
        
        var def = defer();
        sharedPlaylist.save( (error:any, doc:any) =>{
            if (error) {
                def.reject(error)
            } else {
                def.resolve( "Playlist successfully shared." );
            }
        });
        return def.promise;
    }
    
    search(){
        var def = defer();
        this.sharedPlaylistModel.find({}, (error:any, docs:any) =>{
            if( error ){
                def.reject( error );
            }else{
                def.resolve( docs )
            }
        });
        return def.promise;
    }
}