import { Body, Controller, Post, Delete, Patch, Get, Req } from "@nestjs/common";
import { CommandBus, QueryBus } from "@nestjs/cqrs";
import { AddProductToCartDto } from "./commands/dto/add-product-to-cart.dto";
import { RemoveProductFromCartDto } from "./commands/dto/remove-product-from-cart.dto";
import { DecreaseProductQuantityDto } from "./commands/dto/decrease-product-quantity.dto";
import { AddProductToCartImpl } from "./commands/impl/add-product-to-cart.impl";
import { RemoveProductFromCartImpl } from "./commands/impl/remove-product-from-cart.impl";
import { DecreaseProductQuantityImpl } from "./commands/impl/decrease-product-quantity.impl";
import { GetCartQuery } from "./queries/get-cart.query";
import { Request } from "express";
import { ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";

@Controller("cart")
export class CartController {
    constructor(
        private readonly commandBus: CommandBus,
        private readonly queryBus: QueryBus
    ) { }

    @Get()
    @ApiOperation({ summary: 'Get user cart with all products and total price' })
    @ApiResponse({ status: 200, description: 'Cart retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Cart not found' })
    @ApiBearerAuth()
    async getCart(@Req() req: Request) {
        return this.queryBus.execute(new GetCartQuery(req.user.sub));
    }

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

    @Delete("remove-product")
    @ApiOperation({ summary: 'Remove a product from the cart' })
    @ApiResponse({ status: 200, description: 'Product removed from cart successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Product not found in cart' })
    @ApiBearerAuth()
    async removeProductFromCart(
        @Body() removeProductFromCartDto: RemoveProductFromCartDto,
        @Req() req: Request
    ) {
        return this.commandBus.execute(new RemoveProductFromCartImpl({
            ...removeProductFromCartDto,
            userId: req.user.sub
        }));
    }

    @Patch("decrease-quantity")
    @ApiOperation({ summary: 'Decrease product quantity in the cart' })
    @ApiResponse({ status: 200, description: 'Product quantity decreased successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    @ApiResponse({ status: 404, description: 'Product not found in cart' })
    @ApiBearerAuth()
    async decreaseProductQuantity(
        @Body() decreaseProductQuantityDto: DecreaseProductQuantityDto,
        @Req() req: Request
    ) {
        return this.commandBus.execute(new DecreaseProductQuantityImpl({
            ...decreaseProductQuantityDto,
            userId: req.user.sub
        }));
    }
}