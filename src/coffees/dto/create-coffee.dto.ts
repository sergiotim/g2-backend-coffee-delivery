import { IsUrl } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCoffeeDto {
  // não pode ser vazio
  name: string;

  // mínimo de 10 e máximo de 200 caracteres
  description: string;

  // número positivo com até 2 casas decimais
  @Type(() => Number)
  price: number;

  @IsUrl()
  imageUrl: string;

  // deve ser uma URL válida
  tagIds: string[];
} 