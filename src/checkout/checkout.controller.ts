import { Controller, Post, Body, HttpStatus, HttpCode } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutDto } from './dto/checkout.dto';

@Controller('checkout')
export class CheckoutController {
  constructor(private readonly checkoutService: CheckoutService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async checkout(@Body() checkoutDto: CheckoutDto) {
    return this.checkoutService.createOrder(checkoutDto);
  }
} 