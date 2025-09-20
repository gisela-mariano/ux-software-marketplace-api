import { Body, Controller, Post, Req } from "@nestjs/common";
import { CommandBus } from "@nestjs/cqrs";
import { AddProductToCartDto } from "./commands/dto/add-product-to-cart.dto";
import { AddProductToCartImpl } from "./commands/impl/add-product-to-cart.impl";
import { Request } from "express";
import { ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

@Controller("cart")
export class CartController {
    constructor(private readonly commandBus: CommandBus) {}

    @Post("add-product")
    @ApiOperation({ summary: 'Add a product to the cart' })
    @ApiResponse({ status: 201, description: 'Product added to cart successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiBearerAuth()
    async addProductToCart(
        @Body() addProductToCartDto: AddProductToCartDto, 
        @Req() req: Request
    ) {
        return this.commandBus.execute(new AddProductToCartImpl({
            ...addProductToCartDto,
            userId: req.user.sub
        }));
    }
}