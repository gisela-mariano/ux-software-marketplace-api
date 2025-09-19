import { IsString, IsNumber, IsOptional, IsUrl, Min, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto {
  @ApiProperty({ description: 'Product ID', example: 'uuid-string' })
  @IsUUID()
  id: string;

  @ApiProperty({ description: 'Product name', example: 'iPhone 15 Pro', required: false })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Product description', example: 'Latest iPhone Pro with advanced features', required: false })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'Product image URL', example: 'https://example.com/image.jpg', required: false })
  @IsString()
  @IsUrl()
  @IsOptional()
  imageUrl?: string;

  @ApiProperty({ description: 'Product price', example: 1199.99, required: false })
  @IsNumber()
  @Min(0)
  @IsOptional()
  price?: number;
}
