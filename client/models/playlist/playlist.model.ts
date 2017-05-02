import { IPlayList, IRating } from '../../interfaces/playlist/playlist.interface';
import { Sound } from '../../interfaces/player/sound.interface';

export class PlayListModel implements IPlayList{
    _id: string;
    name: string;
    description: string;
    sounds: Array<Sound>;
    ratings: Array<IRating>;
    shared: boolean;
    userAt: string;
    createAt: Date;
    updateAt: Date;
    
    constructor(){
        delete this._id;
        this.sounds = [];
        this.ratings = [];
    }
}