import { PlaylistController } from '../../controllers/playlist/playlist.controller';
import { Server, Request, Response } from 'express'

export class PlaylistRoutes{
    private playlistController: PlaylistController;
    constructor(app:Server){
        this.playlistController = new PlaylistController();
        app.get('/api/v1/:_userId/playlist', (req:Request, res:Response) => this.playlistController.list(req, res));
        app.get('/api/v1/playlist/:_id',  (req:Request, res:Response) => this.playlistController.get(req, res) );
        app.post('/api/v1/playlist',  (req:Request, res:Response) => this.playlistController.save(req, res) );
        app.put('/api/v1/playlist/:_id',  (req:Request, res:Response) => this.playlistController.update(req, res) );
        app.delete('/api/v1/playlist/:_id',  (req:Request, res:Response) => this.playlistController.delete(req, res) );
        app.post('/api/v1/playlist/share',  (req:Request, res:Response) => this.playlistController.share(req, res) );
        app.get('/api/v1/shared/search',  (req:Request, res:Response) => this.playlistController.search(req, res) );
    }
}