import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { CarColorService } from './car_color.service';
import { UpdateCarColorDto } from './dto/updae_car_color.dto';
import { CreateCarColorDto } from './dto/create_car_color.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';

@Controller('car-color')
export class CarColorController {
  constructor(private readonly carColorService: CarColorService) {}

    @UseGuards(AdminGuard)
    @Post()
    create(@Body() dto: CreateCarColorDto) {
      return this.carColorService.create(dto);
    }
  
    @UseGuards(AdminGuard)
    @Put(':id')
    update(
      @Param('id') id: number,
      @Body() dto: UpdateCarColorDto,
    ) {
      return this.carColorService.update(id, dto);
    }
  
    @Get()
    getAll() {
      return this.carColorService.getAll();
    }
  
    @Get(':id')
    getOne(@Param('id') id: number) {
      return this.carColorService.getOneOrFail(id);
    }
}
