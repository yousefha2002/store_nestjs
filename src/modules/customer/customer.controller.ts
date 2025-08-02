import { Body, Controller, Get, Post, Query, UploadedFile, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/multer/multer.options';
import { MulterExceptionFilter } from 'src/multer/multer.exception.filter';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Language } from 'src/common/enums/language';
import { LoginCustomerDto } from './dto/login-customer.dto';
import { CustomerGuard } from 'src/common/guards/customer.guard';
import { CurrentUser } from 'src/common/decorators/currentUser.decorator';
import { Customer } from './entities/customer.entity';
import { Serilaize } from 'src/common/interceptors/serialize.interceptor';
import { CustomerDto } from './dto/customer.dto';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Post('create')
  @UseInterceptors(FileInterceptor('image', multerOptions))
  @UseFilters(MulterExceptionFilter)
  createCustomer(@Body() body:CreateCustomerDto,@Query('lang') lang=Language.en,@UploadedFile() file?: Express.Multer.File)
  {
    return this.customerService.createCustomer(body,lang,file)
  }

  @Post('login')
  async loginOwner(@Body() body: LoginCustomerDto,@Query('lang') lang:Language.en) {
    return this.customerService.login(body,lang);
  }
  
  @Serilaize(CustomerDto)
  @UseGuards(CustomerGuard)
  @Get()
  getMine(@CurrentUser() user:Customer)
  {
    return user
  }
}