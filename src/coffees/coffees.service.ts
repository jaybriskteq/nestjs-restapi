import { Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity';
import { Connection, Repository } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constamts';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entitiy';

@Injectable()
export class CoffeesService {

  constructor(
    @InjectRepository(Coffee)
    private readonly coffeeRepository: Repository<Coffee>,
    @InjectRepository(Flavor)
    private readonly flavorRepository: Repository<Flavor>,
    private readonly connection: Connection,
    @Inject(COFFEE_BRANDS) coffeeBrands: string[],
    private readonly configService: ConfigService,
  ) {
    console.log('coffeeBrands');

    const datahost = this.configService.get('database.host', 'localhost');
    console.log(datahost);
   }

  

  findAll(paginationQuery: PaginationQueryDto) {
    const { limit, offset } = paginationQuery;
 
    return this.coffeeRepository.find({
      relations: ['flavors'],
      take: limit,
      skip: offset,
      
    });
  }

  async findOne(id: string) {
   id;
    const coffee = await this.coffeeRepository.findOne({
      where:{
        id : +id,
      },
      relations: ['flavors'],
      withDeleted: true,
    });
    if (!coffee) {
      throw new NotFoundException(`coffee ${id} not found`);
    }
    return coffee;
  }

  async create(createCoffeeDto: CreateCoffeeDto) {

    const flavors = await Promise.all(
      createCoffeeDto.flavors.map(name => this.preloasFlavorByName(name))
    )
    const coffee = this.coffeeRepository.create({
      ...createCoffeeDto,
      flavors
    });
    return this.coffeeRepository.save(coffee);
  }

  async update(id: string, updateCoffeeDto: UpdateCoffeeDto) {
    const flavors = updateCoffeeDto.flavors
      &&
      (await Promise.all(
        updateCoffeeDto.flavors.map(name => this.preloasFlavorByName(name))
    ));
    const coffee = await this.coffeeRepository.preload({
      id: +id,
      ...updateCoffeeDto,
      flavors
    });

    if (!coffee) {
      throw new NotFoundException(`coffee #${id} not found`);
    }
    return this.coffeeRepository.save(coffee);
  }
  
  async remove(id: string) {
    const coffee = await this.findOne(id);
    return this.coffeeRepository.remove(coffee);
  }

  private async preloasFlavorByName(name: string): Promise<Flavor>{
    const existingFlavor = await this.flavorRepository.findOne({
      where:{
        name : name,
      },
      });
    if (existingFlavor) {
      return existingFlavor;
    }
    return this.flavorRepository.create({name})
  }


  async recommendCoffee(coffee: Coffee) {
    const queryRunner = this.connection.createQueryRunner();


    await queryRunner.connect()
    await queryRunner.startTransaction();



    try {
      coffee.recommendations++;

      const recommendEvent = new Event()
      recommendEvent.name = "recommend_coffee";
      recommendEvent.type = "coffee";
      recommendEvent.payload = { coffeeId: coffee.id }
      
      await queryRunner.manager.save(coffee);
      await queryRunner.manager.save(recommendEvent);
     
      await queryRunner.commitTransaction()
  } catch (err) {
     
      await queryRunner.rollbackTransaction()
  } finally {
      
      await queryRunner.release()
  }
  }


}
