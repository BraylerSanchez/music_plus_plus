import { Sound } from '../player/sound.interface';

export interface IPlayList{
    name: string,
    description: string,
    userAt: string,
    sounds: Array<Sound>,
    createAt: Date,
    updateAt: Date
}

export interface ISharedPlayList{
    origin: IPlayList,
    sharedPlaylists: Array<IPlayList>,
    userAt: string,
    userName: string,
    userPictureUrl: string,
    createAt: Date
}