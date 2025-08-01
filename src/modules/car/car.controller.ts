import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CarService } from './car.service';
import { CustomerGuard } from 'src/common/guards/customer.guard';
import { CreateCarDto } from './dto/create_car.dto';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Customer } from '../customer/entities/customer.entity';

@Controller('car')
export class CarController {
  constructor(private readonly carService: CarService) {}

  @UseGuards(CustomerGuard)
  @Post()
  create(@Body() dto:CreateCarDto,@CurrentUser() user:Customer)
  {
    return this.carService.create(user.id,dto)
  }
}
