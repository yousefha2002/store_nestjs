import { CarModelService } from './../car_model/car_model.service';
import { CarBrandService } from './../car_brand/car_brand.service';
import { CarColorService } from './../car_color/car_color.service';
import { CarTypeService } from './../car_type/car_type.service';
import { Inject, Injectable } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create_car.dto';

@Injectable()
export class CarService {
    constructor(
        @Inject(repositories.car_repository) private carRepo: typeof Car,
        private carTypeService:CarTypeService,
        private carColorService:CarColorService,
        private carBrandService:CarBrandService,
        private carModelService:CarModelService
    ){}

    async create(customerId: number, dto: CreateCarDto) 
    {
        await Promise.all([
            this.carTypeService.getOneOrFail(dto.carTypeId),
            this.carColorService.getOneOrFail(dto.colorId),
            this.carBrandService.getOneOrFail(dto.brandId),
            this.carModelService.getOneOrFail(dto.modelId),
        ]);
        if (dto.isDefault) {
            await this.carRepo.update({ isDefault: false },{ where: { customerId } });
        }
        return this.carRepo.create({
            ...dto,
            customerId,
            isDefault: dto.isDefault ?? false,
        });
    }
}
