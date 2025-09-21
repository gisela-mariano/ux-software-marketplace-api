import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, Min } from "class-validator";

export class DecreaseProductQuantityDto {
    @ApiProperty({ description: 'Product ID' })
    @IsString()
    @IsNotEmpty()
    productId: string;

    @ApiProperty({ description: 'Quantity to decrease' })
    @IsNumber()
    @IsNotEmpty()
    @Min(1)
    quantity: number;
}
