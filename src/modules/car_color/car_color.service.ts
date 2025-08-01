import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { CarColor } from '../car_color/entities/car_color.entity';
import { CreateCarColorDto } from '../car_color/dto/create_car_color.dto';
import { UpdateCarColorDto } from '../car_color/dto/updae_car_color.dto';

@Injectable()
export class CarColorService {
    constructor(
        @Inject(repositories.car_color_repository) private carColorRepo: typeof CarColor,
    ) {}

    async create(dto: CreateCarColorDto) {
        const exists = await this.carColorRepo.findOne({
        where: { name: dto.name },
        });

        if (exists) {
        throw new BadRequestException('Car color with this name already exists');
        }

        return this.carColorRepo.create({ ...dto });
    }

    async update(id: number, dto: UpdateCarColorDto) {
        const color = await this.getOneOrFail(id);

        if (dto.name === color.name) {
        return color;
        }

        if (dto.name) {
        const exists = await this.carColorRepo.findOne({
            where: { name: dto.name },
        });

        if (exists && exists.id !== id) {
            throw new BadRequestException('Car color with this name already exists');
        }
        }

        return color.update(dto);
    }

    async getAll() {
        return this.carColorRepo.findAll();
    }

    async getOneOrFail(id: number) {
        const color = await this.carColorRepo.findByPk(id);

        if (!color) {
        throw new NotFoundException('Car color not found');
        }

        return color;
    }
}