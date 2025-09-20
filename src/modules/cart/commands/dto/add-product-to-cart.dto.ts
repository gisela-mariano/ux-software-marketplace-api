import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber } from "class-validator";

export class AddProductToCartDto {
    @ApiProperty({ description: 'Product ID' })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ description: 'Quantity' })
    @IsNumber()
    @IsNotEmpty()
    quantity: number;
}