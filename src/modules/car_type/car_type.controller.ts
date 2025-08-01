import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { CarTypeService } from '../car_type/car_type.service';
import { CreateCarTypeDto } from '../car_type/dto/create_car_type.dto';
import { UpdateCarTypeDto } from '../car_type/dto/update_car_type.dto';

@Controller('car-type')
export class CarTypeController {
  constructor(private readonly carTypeService: CarTypeService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() dto: CreateCarTypeDto) {
    return this.carTypeService.create(dto);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCarTypeDto,
  ) {
    return this.carTypeService.update(id, dto);
  }

  @Get()
  getAll() {
    return this.carTypeService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.carTypeService.getOneOrFail(id);
  }
}