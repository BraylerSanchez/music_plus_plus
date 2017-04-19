import { SearchModel } from '../../models/youtube/search.model';
import { Request, Response} from 'express'

export class SearchController{
    searchModel: SearchModel;
    
    constructor(){
        this.searchModel = new SearchModel();
    }
    
    search(req:Request, res:Response){
        var query = req.params['query'];
        this.searchModel.search(query).then( (sounds:any) =>{
            res.send({
                status: true,
                sounds: sounds
            })
        }).catch( (error:any) =>{
            res.send({
                status: false,
                message: error
            })
        })
    }
}