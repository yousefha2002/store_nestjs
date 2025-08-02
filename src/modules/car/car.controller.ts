import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { CustomerGuard } from 'src/common/guards/customer.guard';
import { CreateCarDto } from './dto/create_car.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Customer } from '../customer/entities/customer.entity';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { CustomerCarListDto } from './dto/customer-car-list.dto';
import { UpdateCarDto } from './dto/update-car.dto';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(CustomerGuard)
  @Post()
  create(@Body() dto:CreateCarDto,@CurrentUser() user:Customer)
  {
    return this.carService.create(user.id,dto)
  }

  @Serilaize(CustomerCarListDto)
  @UseGuards(CustomerGuard)
  @Get('all/byCustomer')
  getAllCustomerCars(@CurrentUser() user:Customer)
  {
    return this.carService.getAllCustomerCars(user.id)
  }

  @Serilaize(CustomerCarListDto)
  @UseGuards(CustomerGuard)
  @Get(':carId/byCustomer')
  getCustomerCar(@CurrentUser() user:Customer,@Param('carId') carId:number)
  {
    return this.carService.getCustomerCar(user.id,carId)
  }

  @UseGuards(CustomerGuard)
  @Delete(':carId')
  deleteCustomerCar(@CurrentUser() user:Customer,@Param('carId') carId:number)
  {
    return this.carService.delete(user.id,carId)
  }

  @UseGuards(CustomerGuard)
  @Put(':carId')
  update(@Body() dto:UpdateCarDto,@CurrentUser() user:Customer,@Param('carId') carId:number)
  {
    return this.carService.update(user.id,carId,dto)
  }
}
