import { CarModelService } from './../car_model/car_model.service';
import { CarBrandService } from './../car_brand/car_brand.service';
import { CarColorService } from './../car_color/car_color.service';
import { CarTypeService } from './../car_type/car_type.service';
import { BadRequestException, Inject, Injectable, NotFoundException, Param } from '@nestjs/common';
import { repositories } from 'src/common/enums/repositories';
import { Car } from './entities/car.entity';
import { CreateCarDto } from './dto/create_car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { Op } from 'sequelize';

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
        const existing = await this.carRepo.findOne({
        where: {
            customerId,
            carName: dto.carName,
        },
        });

        if (existing) {
        throw new BadRequestException('هذا الاسم مستخدم مسبقًا');
        }
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

    getAllCustomerCars(customerId: number) {
        return this.carRepo.findAll({
            where: { customerId },
            order: [['createdAt', 'DESC']],
            include: ['carType', 'color', 'brand', 'model'],
        });
    }

    async getCustomerCar(customerId:number,carId:number)
    {
        const car = await this.carRepo.findOne({
            where:{id:carId,customerId},
            order: [['createdAt', 'DESC']],
            include: ['carType', 'color', 'brand', 'model']
        })
        if(!car)
        {
            throw new NotFoundException("car is not found")
        }
        return car
    }

    async delete(customerId: number, carId: number) {
        const car = await this.getCustomerCar(customerId, carId);
        await car.destroy();
        return { message: 'تم حذف السيارة بنجاح' };
    }

    async update(customerId: number, carId: number, dto: UpdateCarDto) {
        const car = await this.getCustomerCar(customerId, carId);

        if (dto.carName && dto.carName !== car.carName) {
            const existing = await this.carRepo.findOne({
            where: {
                customerId,
                carName: dto.carName,
                id: { [Op.ne]: carId }
            },
            });

            if (existing) {
                throw new BadRequestException('اسم السيارة مستخدم مسبقًا');
            }
        }

        await Promise.all([
            this.carTypeService.getOneOrFail(dto.carTypeId),
            this.carColorService.getOneOrFail(dto.colorId),
            this.carBrandService.getOneOrFail(dto.brandId),
            this.carModelService.getOneOrFail(dto.modelId),
        ]);

        if (dto.isDefault) {
            await this.carRepo.update({ isDefault: false }, { where: { customerId } });
        }

        return car.update({
            ...dto,
            isDefault: dto.isDefault ?? car.isDefault,
        });
    }
}