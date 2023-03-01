import { Get, Inject, Injectable } from '@nestjs/common';
import { COFFEE_BRANDS } from '../coffees/coffees.constamts';
import { CoffeesService } from '../coffees/coffees.service';

@Injectable()
export class CoffeeRatingService {
    constructor(private readonly coffeesService: CoffeesService) {
    }


   
    

   
}
