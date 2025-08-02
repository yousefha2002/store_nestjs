import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { CarColorService } from './car_color.service';
import { UpdateCarColorDto } from './dto/updae_car_color.dto';
import { CreateCarColorDto } from './dto/create_car_color.dto';
import { AdminGuard } from 'src/common/guards/admin.guard';
import { Language } from 'src/common/enums/language';

@Controller('car-color')
export class CarColorController {
  constructor(private readonly carColorService: CarColorService) {}

  @UseGuards(AdminGuard)
  @Post()
  create(@Body() dto: CreateCarColorDto, @Query('lang') lang: Language = Language.en) {
    return this.carColorService.create(dto, lang);
  }

  @UseGuards(AdminGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() dto: UpdateCarColorDto,
    @Query('lang') lang: Language = Language.en,
  ) {
    return this.carColorService.update(id, dto, lang);
  }

  @Get()
  getAll() {
    return this.carColorService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: number, @Query('lang') lang: Language = Language.en) {
    return this.carColorService.getOneOrFail(id, lang);
  }
}