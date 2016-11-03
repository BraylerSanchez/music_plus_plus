import { PlaylistModel } from '../../models/playlist/playlist.model';

export class PlaylistController{
    playlistModel: PlaylistModel;
    
    constructor(){
        this.playlistModel = new PlaylistModel();
    }
    
    save(req, res){
        var playlist = req.body;
        this.playlistModel.save(playlist).then( (message) =>{
            res.json({
                status: true,
                message: message
            })
        }).catch( (error) =>{
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    update(req, res){
        var playlist = req.body,
            _id = req.params['_id'];
        this.playlistModel.update(_id, playlist).then( (message) =>{
            res.json({
                status: true,
                message: message
            })
        }).catch( (error) =>{
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    get(req, res){
        var id = req.params['_id'];
        if( id == '0'){
            res.send({
                status: false,
                playlist: { sounds: [] },
                message: 'object no found'
            })
        }
        this.playlistModel.get(id).then( (docs) =>{
            res.json({
                status: true,
                playlist: docs['length'] > 0? docs[0] : {}
            })
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    list(req, res){
        this.playlistModel.list( ).then( (docs) =>{
            res.json({
                status: true,
                playlists: docs
            })
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
    
    delete(req, res){
        var id = req.body['_id'];
        this.playlistModel.delete( id ).then( (result) =>{
            res.json({
                status: true,
                message: result
            })
        }).catch( (error) => {
            res.send({
                status: false,
                message: error
            })
        })
    }
}