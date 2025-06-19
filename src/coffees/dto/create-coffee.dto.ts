import { ArrayNotEmpty, IsNotEmpty, IsNumber, IsPositive, IsString, IsUrl, MaxLength, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCoffeeDto {
  // não pode ser vazio
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  // mínimo de 10 e máximo de 200 caracteres
  @MinLength(10)
  @MaxLength(20)
  description: string;

  // número positivo com até 2 casas decimais
  @IsPositive()
  @IsNumber({maxDecimalPlaces:2})
  @Type(() => Number)
  price: number;

  // deve ser uma URL válida
  @IsUrl()
  imageUrl: string;

  @ArrayNotEmpty()
  @IsString({each:true})
  tagIds: string[];
} 