import { Controller, Get } from '@nestjs/common';
import { AvatarService } from './avatar.service';
import { presetAvatars } from 'src/common/constants/avatars';

@Controller('avatar')
export class AvatarController {
  constructor(private readonly avatarService: AvatarService) {}
  
  @Get()
  getAvatars() {
    return presetAvatars;
  }
}
