import { SearchModel } from '../../models/youtube/search.model';

export class SearchController{
    searchModel: SearchModel;
    
    constructor(){
        this.searchModel = new SearchModel();
    }
    
    search(req, res){
        var query = req.params['query'];
        this.searchModel.search(query).then( (sounds) =>{
            res.send({
                status: true,
                sounds: sounds
            })
        }).catch( (error) =>{
            res.send({
                status: false,
                message: error
            })
        })
    }
}