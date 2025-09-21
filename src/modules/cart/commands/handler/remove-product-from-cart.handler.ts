import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { RemoveProductFromCartImpl } from "../impl/remove-product-from-cart.impl";
import { PrismaService } from "src/core/infra/database/prisma.service";
import { NotFoundException } from "@nestjs/common";

@CommandHandler(RemoveProductFromCartImpl)
export class RemoveProductFromCartHandler implements ICommandHandler<RemoveProductFromCartImpl> {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(command: RemoveProductFromCartImpl) {
        const { productId, userId } = command.data;

        const cart = await this.prismaService.cart.findUnique({
            where: {
                userId
            }
        });

        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        const productInCart = await this.prismaService.productInCart.findFirst({
            where: {
                productId,
                cartId: cart.id
            },
            include: {
                product: true
            }
        });

        if (!productInCart) {
            throw new NotFoundException('Product not found in cart');
        }

        await this.prismaService.productInCart.delete({
            where: {
                productId_cartId: {
                    productId,
                    cartId: cart.id
                }
            }
        });

        return {
            message: 'Product removed from cart successfully',
            product: productInCart.product
        };
    }
}
