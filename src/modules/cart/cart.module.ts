import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { AddProductToCartHandler } from "./commands/handler/add-product-to-cart.handler";
import { RemoveProductFromCartHandler } from "./commands/handler/remove-product-from-cart.handler";

@Module({
  imports: [],
  controllers: [CartController],
  providers: [AddProductToCartHandler, RemoveProductFromCartHandler]
})
export class CartModule {}