import { Module } from "@nestjs/common";
import { CartController } from "./cart.controller";
import { AddProductToCartHandler } from "./commands/handler/add-product-to-cart.handler";
import { RemoveProductFromCartHandler } from "./commands/handler/remove-product-from-cart.handler";
import { DecreaseProductQuantityHandler } from "./commands/handler/decrease-product-quantity.handler";
import { GetCartHandler } from "./queries/handlers/get-cart.handler";

@Module({
  imports: [],
  controllers: [CartController],
  providers: [
    AddProductToCartHandler,
    RemoveProductFromCartHandler,
    DecreaseProductQuantityHandler,
    GetCartHandler
  ]
})
export class CartModule { }