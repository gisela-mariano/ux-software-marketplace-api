import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { AddProductToCartImpl } from "../impl/add-product-to-cart.impl";
import { PrismaService } from "src/core/infra/database/prisma.service";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(AddProductToCartImpl)
export class AddProductToCartHandler implements ICommandHandler<AddProductToCartImpl> {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(command: AddProductToCartImpl) {
        const { productId, quantity, userId } = command.data;

        const cart = await this.prismaService.cart.findUnique({
            where: {
                userId
            }
        });
        
        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        await this.prismaService.productInCart.create({
            data: {
                productId, quantity, cartId: cart.id
            }
        });

        return { message: 'Product added to cart successfully' };
    }
}