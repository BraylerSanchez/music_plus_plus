import { PlaylistController } from '../../controllers/playlist/playlist.controller';

export class PlaylistRoutes{
    private playlistController: PlaylistController;
    constructor(app:any){
        this.playlistController = new PlaylistController();
        app.get('/api/v1/:_userId/playlist', (req, res) => this.playlistController.list(req, res));
        app.get('/api/v1/playlist/:_id',  (req, res) => this.playlistController.get(req, res) );
        app.post('/api/v1/playlist',  (req, res) => this.playlistController.save(req, res) );
        app.put('/api/v1/playlist/:_id',  (req, res) => this.playlistController.update(req, res) );
        app.delete('/api/v1/playlist/:_id',  (req, res) => this.playlistController.delete(req, res) );
    }
}