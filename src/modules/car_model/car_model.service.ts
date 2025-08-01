import {
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { CreateCarModelDto } from './dto/create_car_model.dto';
import { UpdateCarModelDto } from './dto/update_car_model.dto';
import { CarModel } from './entites/car_model.entity';

@Injectable()
export class CarModelService {
    constructor(
        @Inject(repositories.car_model_repository) private carModelRepo: typeof CarModel,
    ) {}

    async create(dto: CreateCarModelDto) {
        const exists = await this.carModelRepo.findOne({
        where: { name: dto.name },
        });

        if (exists) {
        throw new BadRequestException('Car model with this name already exists');
        }

        return this.carModelRepo.create({ ...dto });
    }

    async update(id: number, dto: UpdateCarModelDto) {
        const model = await this.getOneOrFail(id);

        if (dto.name === model.name) {
        return model;
        }

        if (dto.name) {
        const exists = await this.carModelRepo.findOne({
            where: { name: dto.name },
        });

        if (exists && exists.id !== id) {
            throw new BadRequestException('Car model with this name already exists');
        }
        }

        return model.update(dto);
    }

    async getAll() {
        return this.carModelRepo.findAll();
    }

    async getOneOrFail(id: number) {
        const model = await this.carModelRepo.findByPk(id);

        if (!model) {
        throw new NotFoundException('Car model not found');
        }

        return model;
    }
}