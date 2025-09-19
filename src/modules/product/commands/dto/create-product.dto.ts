import { IsString, IsNumber, IsNotEmpty, IsUrl, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'iPhone 15' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'Product description', example: 'Latest iPhone with advanced features' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'Product image URL', example: 'https://example.com/image.jpg' })
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;

  @ApiProperty({ description: 'Product price', example: 999.99 })
  @IsNumber()
  @Min(0)
  price: number;
}
