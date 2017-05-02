import { PlaylistModel } from '../../models/playlist/playlist.model';
import { Request, Response} from 'express'

export class PlaylistController{
    playlistModel: PlaylistModel;
    
    constructor(){
        this.playlistModel = new PlaylistModel();
    }
    
    save(req:Request, res:Response){
        var playlist = req['body'];
        playlist.createAt = new Date();
        playlist.updateAt = new Date();
        
        this.playlistModel.save(playlist).then( (response:any) =>{
            res.json({
                status: true,
                message: response.message,
                playlist: response.playlist
            })
        }).catch( (error:any) =>{
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    update(req:Request, res:Response){
        var playlist = req['body'],
            _id = req.params['_id'];
        playlist.updateAt = new Date();
        this.playlistModel.update(_id, playlist).then( (response:any) =>{
            res.json({
                status: true,
                message: response.message,
                playlist: response.playlist
            })
        }).catch( (error:any) =>{
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    get(req:Request, res:Response){
        var id = req.params['_id'];
        if( id == '0'){
            res.send({
                status: false,
                playlist: { name:'', description:'', sounds: [], userAt: ''},
                message: 'object no found'
            })
        }
        this.playlistModel.get(id).then( (docs:any) =>{
            res.json({
                status: true,
                playlist: docs['length'] > 0? docs[0] : {}
            })
        }).catch( (error:any) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    list(req:Request, res:Response){
        let userId = req.params['_userId'];
        this.playlistModel.list( userId ).then( (docs:any) =>{
            res.json({
                status: true,
                playlists: docs
            })
        }).catch( (error:any) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    delete(req:Request, res:Response){
        var id = req.params['_id'];
        this.playlistModel.delete( id ).then( (result:any) =>{
            res.json({
                status: true,
                message: result
            })
        }).catch( (error:any) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    share(req:Request, res:Response){
        var sharedPlaylist = req['body'];
        sharedPlaylist.createAt = new Date();
        
        this.playlistModel.share(sharedPlaylist).then( (message:any) =>{
            res.json({
                status: true,
                message: message
            })
        }).catch( (error:any) =>{
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    search(req:Request, res:Response){
        this.playlistModel.search().then( (docs:any) =>{
            res.json({
                status: true,
                playlist: docs
            })
        }).catch( (error:any) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
}