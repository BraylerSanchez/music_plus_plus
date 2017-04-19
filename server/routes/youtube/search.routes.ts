import { SearchController } from '../../controllers/youtube/search.controller';
import { Request, Response } from 'express'

export class SearchRoutes{
    private searchController: SearchController;
    constructor(app:any){
        this.searchController = new SearchController();
        app.get('/api/v1/youtube/search/:query', (req:Request, res:Response) => 
        this.searchController.search(req, res));
    }
}