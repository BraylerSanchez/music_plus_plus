import { IRating } from '../../interfaces/playlist/playlist.interface';
export class RatingSchema implements IRating{
    user_name:string;
    rating:number;
    create_date:Date;
    comment: string;

    constructor(){
        this.create_date = new Date();
    }
}