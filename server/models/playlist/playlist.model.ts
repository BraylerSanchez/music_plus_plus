import * as mongoose from 'mongoose';
import { defer } from 'q';
import { PlayListSchema } from '../../schemas/playlist/playlist.schema'

export class PlaylistModel{
    public playlistModelMG: any;
    
    constructor( ){
        this.playlistModelMG = mongoose.model('playlist', PlayListSchema)
    }
    
    list( ){
        var def = defer();
        this.playlistModelMG.find( {}, (error, docs) =>{
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
        this.playlistModelMG.find( {_id: _id}, (error, docs) =>{
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
        this.playlistModelMG.remove( {_id: _id}, (error) =>{
            if( error ){
                def.reject( error );
            }else{
                def.resolve( 'playlist delete success' )
            }
        });
        return def.promise;
    }
    
    save( _playlist){
        var def = defer();
        var playlist = new this.playlistModelMG( _playlist );
        playlist.save( (error, doc) =>{
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
        this.playlistModelMG.update( {_id: _id}, _playlist, {}, (error, doc) =>{
            if (error) {
                def.reject(error)
            } else {
                def.resolve( "Playlist update success." );
            }
        });
        return def.promise;
    }
}