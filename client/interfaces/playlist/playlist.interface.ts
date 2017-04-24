import { Sound } from '../player/sound.interface';

export interface IPlayList{
    _id: string;
    name: string;
    description: string;
    sounds: Array<Sound>;
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