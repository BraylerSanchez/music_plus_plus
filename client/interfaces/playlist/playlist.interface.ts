import { Sound } from '../player/sound.interface';

export interface IPlayList{
    name: string,
    description: string,
    userAt: string,
    sounds: Array<Sound>,
    createAt: Date,
    updateAt: Date
}