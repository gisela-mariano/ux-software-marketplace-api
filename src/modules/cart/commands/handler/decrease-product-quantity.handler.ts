import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { DecreaseProductQuantityImpl } from "../impl/decrease-product-quantity.impl";
import { PrismaService } from "src/core/infra/database/prisma.service";
import { NotFoundException, BadRequestException } from "@nestjs/common";

@CommandHandler(DecreaseProductQuantityImpl)
export class DecreaseProductQuantityHandler implements ICommandHandler<DecreaseProductQuantityImpl> {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(command: DecreaseProductQuantityImpl) {
        const { productId, quantity, userId } = command.data;

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

        const newQuantity = productInCart.quantity - quantity;

        if (newQuantity <= 0) {
            // Se a quantidade ficar zero ou negativa, remove o produto do carrinho
            await this.prismaService.productInCart.delete({
                where: {
                    productId_cartId: {
                        productId,
                        cartId: cart.id
                    }
                }
            });

            return {
                message: 'Product removed from cart (quantity reached zero)',
                product: productInCart.product,
                quantity: 0
            };
        }

        // Atualiza a quantidade
        const updatedProductInCart = await this.prismaService.productInCart.update({
            where: {
                productId_cartId: {
                    productId,
                    cartId: cart.id
                }
            },
            data: {
                quantity: newQuantity
            },
            include: {
                product: true
            }
        });

        return {
            message: 'Product quantity decreased successfully',
            product: updatedProductInCart.product,
            quantity: updatedProductInCart.quantity
        };
    }
}
