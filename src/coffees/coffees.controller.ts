 import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { resolve } from 'path';
import { Public } from '../common/decorators/public.docorators';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { ParseIntPipe } from '../common/pipes/parse-int/parse-int.pipe';
import { ApiForbiddenResponse, ApiTags } from '@nestjs/swagger/dist';


@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(private readonly coffeesService: CoffeesService) { }
  
 
  @ApiForbiddenResponse({description: 'Forbidden'})
  @Public()
  @Get()
  async findall(@Query() paginationQuery: PaginationQueryDto) {
    //   const { limit, offset } = paginationQuery;
   
    // await new Promise(resolve  => setTimeout(resolve , 5000))
    return this.coffeesService.findAll(paginationQuery);
  }
 
  @Get(':id')
  findone(@Param('id', ParseIntPipe) id: number) {
    console.log(id);
    return this.coffeesService.findOne(' ' + id);
  }

  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // console.log(createCoffeeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }
 
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}


 
