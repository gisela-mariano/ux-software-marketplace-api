import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { AddProductToCartHandler } from "./commands/handler/add-product-to-cart.handler";

@Module({
  imports: [],
  controllers: [CartController],
  providers: [AddProductToCartHandler]
})
export class CartModule {}