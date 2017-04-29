import { Sound } from '../player/sound.interface';
export interface IPlayList{
    _id: string;
    name: string;
    description: string;
    sounds: Array<Sound>;
    ratings: Array<IRating>;
    userAt: string;
    createAt: Date;
    updateAt: Date;
}

export interface ISharedPlayList{
    origin: IPlayList,
    sharedPlaylists: Array<IPlayList>,
    userAt: string,
    userName: string,
    userPictureUrl: string,
    createAt: Date
}

export interface IRating{
    user_name:string;
    rating:number;
    create_date:Date;
    comment: string;
}