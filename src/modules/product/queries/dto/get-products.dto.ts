import { ApiProperty } from "@nestjs/swagger";

export class GetProductsDto {
    @ApiProperty({
        description: 'The page number',
        example: 1,
        required: false
    })
    page: number;

    @ApiProperty({
        description: 'The limit of products per page',
        example: 10,
        required: false
    })
    limit: number;

    @ApiProperty({
        description: 'The name of the product',
        example: 'Product 1',
        required: false
    })
    name?: string;

    @ApiProperty({
        description: 'The description of the product',
        example: 'Product 1 description',
        required: false
    })
    description?: string;

    @ApiProperty({
        description: 'The price of the product',
        example: 100,
        required: false
    })
    price?: number;
}