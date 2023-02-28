import { Module } from '@nestjs/common';
import { CoffeesModule } from 'src/coffees/coffees.module';
import { CoffeeRatingControllerController } from './coffee-rating.controller.controller';
import { CoffeeRatingService } from './coffee-rating.service';


@Module({
  imports: [CoffeesModule],
  providers: [CoffeeRatingService],
  controllers: [CoffeeRatingControllerController],
})
export class CoffeeRatingModule {}
