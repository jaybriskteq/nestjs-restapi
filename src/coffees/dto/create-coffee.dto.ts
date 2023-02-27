/* eslint-disable prettier/prettier */
import { IsString } from 'class-validator';
import { Flavor } from '../entities/flavor.entitiy';

export class CreateCoffeeDto {
  @IsString()

  readonly name: string;

  @IsString()
  readonly brand: string;

  @IsString({ each: true })
  readonly flavors: string[];
}
