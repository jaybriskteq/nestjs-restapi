import { Controller, Get, Query } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';
import { Public } from 'src/common/decorators/public.docorators';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';

@Controller('coffee-rating')
export class CoffeeRatingControllerController {
    constructor(private readonly coffeesService: CoffeesService) { }

    @Public()
    @Get()
    findall(@Query() paginationQuery: PaginationQueryDto) {
      //   const { limit, offset } = paginationQuery;
      return this.coffeesService.findAll(paginationQuery);
    }
}
