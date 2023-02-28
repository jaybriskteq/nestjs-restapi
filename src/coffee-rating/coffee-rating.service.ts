import { Get, Inject, Injectable } from '@nestjs/common';
import { COFFEE_BRANDS } from 'src/coffees/coffees.constamts';
import { CoffeesService } from 'src/coffees/coffees.service';

@Injectable()
export class CoffeeRatingService {
    constructor(private readonly coffeesService: CoffeesService) {
    }


   
    

   
}
