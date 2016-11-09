import { SearchController } from '../../controllers/youtube/search.controller';

export class SearchRoutes{
    private searchController: SearchController;
    constructor(app:any){
        this.searchController = new SearchController();
        app.get('/api/v1/youtube/search/:query', (req, res) => this.searchController.search(req, res));
    }
}