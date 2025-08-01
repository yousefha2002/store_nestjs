import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import {BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Avatar } from './entities/avatar.entity';

@Injectable()
export class AvatarService {
    constructor(
        @Inject(repositories.avatar_repository) private avatarRepo: typeof Avatar,
        private cloudinaryService:CloudinaryService
    ){}
    async findById(id: number) 
    {
        const avatar = await this.avatarRepo.findByPk(id)
        if(!avatar)
        {
            throw new NotFoundException('avatar is not found')
        }
        return avatar
    }

    findAll()
    {
        return this.avatarRepo.findAll()
    }

    async create(file?: Express.Multer.File)
    {
        if(!file)
        {
            throw new BadRequestException('file is not found')
        }
        const result = await this.cloudinaryService.uploadImage(file);
        const avatar = await this.avatarRepo.create({url: result.secure_url,publicId: result.public_id})
        return {avatar,message:"avatar has been created"}
    }
}
