import { SearchController } from '../../controllers/youtube/search.controller';
import { Server, Request, Response } from 'express'

export class SearchRoutes{
    private searchController: SearchController;
    constructor(app:Server){
        this.searchController = new SearchController();
        app.get('/api/v1/youtube/search/:query', (req:Request, res:Response) => 
        this.searchController.search(req, res));
    }
}