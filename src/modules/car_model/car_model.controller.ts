import { Body, Controller, Get, Param, Post, Put, ParseIntPipe, UseGuards } from '@nestjs/common';
import { CarModelService } from '../car_model/car_model.service';
import { CreateCarModelDto } from '../car_model/dto/create_car_model.dto';
import { UpdateCarModelDto } from '../car_model/dto/update_car_model.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('car-model')
export class CarModelController {
  constructor(private readonly carModelService: CarModelService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() dto: CreateCarModelDto) {
    return this.carModelService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCarModelDto,
  ) {
    return this.carModelService.update(id, dto);
  }

  @Get()
  getAll() {
    return this.carModelService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.carModelService.getOneOrFail(id);
  }
}