import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { CarBrandService } from './car_brand.service';
import { CreateCarBrandDto } from './dto/create_car_brand.dto';
import { UpdateCarBrandDto } from './dto/update_car_brand.dto';

@Controller('car-brand')
export class CarBrandController {
  constructor(private readonly carBrandService: CarBrandService) {}

  @Post()
  create(@Body() dto: CreateCarBrandDto) {
    return this.carBrandService.create(dto);
  }

  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateCarBrandDto,
  ) {
    return this.carBrandService.update(id, dto);
  }

  @Get()
  getAll() {
    return this.carBrandService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number) {
    return this.carBrandService.getOneOrFail(id);
  }
}