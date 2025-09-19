import { Controller, Get, Post, Put, Delete, Query, Body, Param } from "@nestjs/common";
import { QueryBus, CommandBus } from "@nestjs/cqrs";
import { GetProductsDto } from "./queries/dto/get-products.dto";
import { GetProductsQuery } from "./queries/impl/get-products.query";
import { GetProductByIdQuery } from "./queries/impl/get-product-by-id.query";
import { CreateProductCommand } from "./commands/impl/create-product.command";
import { UpdateProductCommand } from "./commands/impl/update-product.command";
import { DeleteProductCommand } from "./commands/impl/delete-product.command";
import { CreateProductDto } from "./commands/dto/create-product.dto";
import { UpdateProductDto } from "./commands/dto/update-product.dto";
import { ApiOperation, ApiResponse, ApiTags, ApiBearerAuth } from "@nestjs/swagger";
import { Public } from "../auth/decorators/public.decorator";
import { Roles } from "../../core/decorators/roles.decorator";

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get products with pagination and filters' })
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

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Public()
  async getProductById(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductByIdQuery({ id }));
  }

  @Post()
  @ApiOperation({ summary: 'Create a new product (Admin only)' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async createProduct(@Body() createProductDto: CreateProductDto) {
    return this.commandBus.execute(new CreateProductCommand(createProductDto));
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: Omit<UpdateProductDto, 'id'>
  ) {
    return this.commandBus.execute(new UpdateProductCommand({
      id,
      ...updateProductDto
    }));
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product (Admin only)' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async deleteProduct(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProductCommand({ id }));
  }
}