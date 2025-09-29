import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from '../../core/decorators/roles.decorator';
import { Public } from '../auth/decorators/public.decorator';
import {
  CreateProductDto,
  CreateProductWithImageUrlDto,
} from './commands/dto/create-product.dto';
import {
  UpdateProductDtoWithoutId,
  UpdateProductDtoWithoutIdWithImageUrl,
} from './commands/dto/update-product.dto';
import { CreateProductCommand } from './commands/impl/create-product.command';
import { DeleteProductCommand } from './commands/impl/delete-product.command';
import { UpdateProductCommand } from './commands/impl/update-product.command';
import { GetProductsDto } from './queries/dto/get-products.dto';
import { GetProductByIdQuery } from './queries/impl/get-product-by-id.query';
import { GetProductsQuery } from './queries/impl/get-products.query';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get products with pagination and filters' })
  @ApiResponse({
    status: 200,
    example: {
      page: 1,
      limit: 10,
      total: 100,
      products: [],
    },
  })
  @Public()
  async getProducts(@Query() query: GetProductsDto) {
    return this.queryBus.execute(
      new GetProductsQuery({
        ...query,
        price: query.price ? Number(query.price) : undefined,
      }),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiResponse({
    status: 200,
    example: {
      id: '1',
      name: 'iPhone 15',
      description: 'Latest iPhone with advanced features',
      imageUrl: `${process.env.BASE_URL}/image.jpg`,
      price: 999.99,
    },
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @Public()
  async getProductById(@Param('id') id: string) {
    return this.queryBus.execute(new GetProductByIdQuery({ id }));
  }

  @Post()
  @ApiOperation({
    summary: 'Create a new product - using image file (Admin only)',
  })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 201,
    example: {
      id: '1',
      name: 'iPhone 15',
      description: 'Latest iPhone with advanced features',
      imageUrl: `${process.env.BASE_URL}/image.jpg`,
      price: 999.99,
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 403,
    example: {
      message: 'Forbidden - Admin role required',
      statusCode: 403,
    },
  })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async createProduct(
    @UploadedFile() image: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.commandBus.execute(
      new CreateProductCommand({
        ...createProductDto,
        price: Number(createProductDto.price),
        imageUrl: image.filename,
      }),
    );
  }

  @Post('/image-url')
  @ApiOperation({
    summary: 'Create a new product - using image url (Admin only)',
  })
  @ApiResponse({
    status: 201,
    example: {
      id: '1',
      name: 'iPhone 15',
      description: 'Latest iPhone with advanced features',
      imageUrl: `${process.env.BASE_URL}/image.jpg`,
      price: 999.99,
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: 'Unauthorized',
      statusCode: 401,
    },
  })
  @ApiResponse({
    status: 403,
    example: {
      message: 'Forbidden - Admin role required',
      statusCode: 403,
    },
  })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async createProductWithImageUrl(
    @Body() createProductDto: CreateProductWithImageUrlDto,
  ) {
    return this.commandBus.execute(
      new CreateProductCommand({
        ...createProductDto,
        price: Number(createProductDto.price),
        imageUrl: createProductDto.imageUrl,
      }),
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a product (Admin only)' })
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @ApiResponse({
    status: 200,
    example: {
      id: '1',
      name: 'iPhone 15',
      description: 'Latest iPhone with advanced features',
      imageUrl: `${process.env.BASE_URL}/image.jpg`,
      price: 999.99,
    },
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async updateProduct(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDtoWithoutId,
    @UploadedFile() image: Express.Multer.File,
  ) {
    return this.commandBus.execute(
      new UpdateProductCommand({
        id,
        price: updateProductDto.price
          ? Number(updateProductDto.price)
          : undefined,
        imageUrl: image ? image.filename : undefined,
        description: updateProductDto.description
          ? updateProductDto.description
          : undefined,
        name: updateProductDto.name ? updateProductDto.name : undefined,
      }),
    );
  }

  @Put('/image-url/:id')
  @ApiOperation({ summary: 'Update a product - using image url (Admin only)' })
  @ApiResponse({
    status: 200,
    example: {
      id: '1',
      name: 'iPhone 15',
      description: 'Latest iPhone with advanced features',
      imageUrl: `${process.env.BASE_URL}/image.jpg`,
      price: 999.99,
    },
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async updateProductWithImageUrl(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDtoWithoutIdWithImageUrl,
  ) {
    return this.commandBus.execute(
      new UpdateProductCommand({
        id,
        price: updateProductDto.price
          ? Number(updateProductDto.price)
          : undefined,
        imageUrl: updateProductDto.imageUrl
          ? updateProductDto.imageUrl
          : undefined,
        description: updateProductDto.description
          ? updateProductDto.description
          : undefined,
        name: updateProductDto.name ? updateProductDto.name : undefined,
      }),
    );
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product (Admin only)' })
  @ApiResponse({
    status: 200,
    example: {
      message: 'Product deleted successfully',
      product: {
        id: '1',
        name: 'iPhone 15',
        description: 'Latest iPhone with advanced features',
        imageUrl: `${process.env.BASE_URL}/image.jpg`,
        price: 999.99,
      },
    },
  })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 403, description: 'Forbidden - Admin role required' })
  @ApiBearerAuth()
  @Roles(['ADMIN'])
  async deleteProduct(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProductCommand({ id }));
  }
}
