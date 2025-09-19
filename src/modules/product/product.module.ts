import { Module } from "@nestjs/common";
import { GetProductsHandler } from "./queries/handlers/get-products.handler";
import { ProductController } from "./product.controller";

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [GetProductsHandler]
})
export class ProductModule { }