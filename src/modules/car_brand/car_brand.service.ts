import { BadRequestException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { CarBrand } from './entities/car_brand.entity';
import { UpdateCarBrandDto } from './dto/update_car_brand.dto';
import { CreateCarBrandDto } from './dto/create_car_brand.dto';

@Injectable()
export class CarBrandService {
    constructor(
        @Inject(repositories.car_brand_repository) private carBrandRep: typeof CarBrand,
    ){}

    async create(dto: CreateCarBrandDto) {
        const exists = await this.carBrandRep.findOne({ where: { name: dto.name } });
        if (exists) {
            throw new BadRequestException('Car brand with this name already exists');
        }
        return this.carBrandRep.create({ ...dto });
    }

    async update(id: number, dto: UpdateCarBrandDto) 
    {
        const brand = await this.getOneOrFail(id);
        if (dto.name === brand.name) {
            return brand;
        }
        if (dto.name) {
            const exists = await this.carBrandRep.findOne({where: { name: dto.name }});
            if (exists && exists.id !== id) {
                throw new BadRequestException('Car brand with this name already exists');
            }
        }
        return brand.update(dto);
    }

    async getAll() {
        return this.carBrandRep.findAll();
    }

    async getOneOrFail(id: number) {
        const brand = await this.carBrandRep.findByPk(id);
        if (!brand) {
        throw new NotFoundException('Car brand not found');
        }
        return brand;
    }
}
