import { Injectable, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
import { Event } from '../events/entities/event.entity';

import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entitiy';

@Injectable()
export class CoffeeBrandsFactory {
  create() {
    return ['BUDDY BREW', 'NESCAFE'];
  }
}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event]), ConfigModule],
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      provide: 'COFFEE_BRANDS',
      useFactory: () => ['BUDDY BREW', 'NESCAFE'],
    },
  ],
  exports: [CoffeesService],
})
export class CoffeesModule {}
