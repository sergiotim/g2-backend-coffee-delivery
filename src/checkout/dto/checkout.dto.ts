import { IsNotEmpty, IsString, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @IsNotEmpty()
  @IsString()
  street: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsNotEmpty()
  @IsString()
  state: string;

  @IsNotEmpty()
  @IsString()
  zipCode: string;
}

export class CheckoutDto {
  @IsNotEmpty()
  @IsString()
  cartId: string;

  @IsObject()
  @ValidateNested()
  @Type(() => AddressDto)
  deliveryAddress: AddressDto;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;
} 