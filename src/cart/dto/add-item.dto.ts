import { IsNotEmpty, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class AddItemDto {
  @IsNotEmpty()
  @IsString()
  coffeeId: string;

  @IsInt()
  @Min(1)
  @Max(5)
  @Type(() => Number)
  quantity: number;
} 