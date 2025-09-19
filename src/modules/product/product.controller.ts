import { Controller, Get, Query } from "@nestjs/common";
import { QueryBus } from "@nestjs/cqrs";
import { GetProductsDto } from "./queries/dto/get-products.dto";
import { GetProductsQuery } from "./queries/impl/get-products.query";
import { ApiBearerAuth, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "../auth/decorators/public.decorator";

@Controller('products')
export class ProductController {
  constructor(private readonly queryBus: QueryBus) {}

  @Get()
  @ApiOperation({ summary: 'Get products' })
  @ApiResponse({ status: 200, example: {
    page: 1,
    limit: 10,
    total: 100,
    products: []
  } })
  @Public()
  async getProducts(@Query() query: GetProductsDto) {
    return this.queryBus.execute(new GetProductsQuery({
      ...query,
      price: query.price ? Number(query.price) : undefined
    }));
  }
}