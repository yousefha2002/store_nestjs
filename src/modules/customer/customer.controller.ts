import { Body, Controller, Post, Query, UploadedFile, UseFilters, UseInterceptors } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerOptions } from 'src/multer/multer.options';
import { MulterExceptionFilter } from 'src/multer/multer.exception.filter';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { Language } from 'src/common/enums/language';
import { LoginCustomerDto } from './dto/login-customer.dto';

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
}