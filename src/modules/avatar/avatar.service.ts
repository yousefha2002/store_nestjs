import {Injectable } from '@nestjs/common';
import { presetAvatars } from 'src/common/constants/avatars';

@Injectable()
export class AvatarService {
    constructor(){}
    findById(id: number) {
        return presetAvatars.find((avatar) => avatar.id === id);
    }
}
