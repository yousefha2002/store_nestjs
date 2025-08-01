import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { CreateCarTypeDto } from './dto/create_car_type.dto';
import { UpdateCarTypeDto } from './dto/update_car_type.dto';
import { CarType } from './entites/car_type.entity';

@Injectable()
export class CarTypeService {
    constructor(
        @Inject(repositories.car_type_repository) private carTypeRepo: typeof CarType,
    ) {}

    async create(dto: CreateCarTypeDto) {
        const exists = await this.carTypeRepo.findOne({
        where: { name: dto.name },
        });
        if (exists) {
        throw new BadRequestException('Car type with this name already exists');
        }
        return this.carTypeRepo.create({ ...dto });
    }

    async update(id: number, dto: UpdateCarTypeDto) {
        const type = await this.getOneOrFail(id);
        if (dto.name === type.name) {
        return type;
        }
        if (dto.name) {
        const exists = await this.carTypeRepo.findOne({
            where: { name: dto.name },
        });
        if (exists && exists.id !== id) {
            throw new BadRequestException('Car type with this name already exists');
        }
        }
        return type.update(dto);
    }

    async getAll() {
        return this.carTypeRepo.findAll();
    }

    async getOneOrFail(id: number) {
        const type = await this.carTypeRepo.findByPk(id);
        if (!type) {
        throw new NotFoundException('Car type not found');
        }
        return type;
    }
}