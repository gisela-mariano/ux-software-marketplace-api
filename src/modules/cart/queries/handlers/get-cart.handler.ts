import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/core/infra/database/prisma.service";
import { NotFoundException } from "@nestjs/common";
import { GetCartQuery } from "../get-cart.query";

@QueryHandler(GetCartQuery)
export class GetCartHandler implements IQueryHandler<GetCartQuery> {
    constructor(private readonly prismaService: PrismaService) {}

    async execute(query: GetCartQuery) {
        const { userId } = query;

        const cart = await this.prismaService.cart.findUnique({
            where: {
                userId
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        });

        if (!cart) {
            throw new NotFoundException('Cart not found');
        }

        // Calcular o preço total e formatar os dados
        let totalPrice = 0;
        const cartItems = cart.products.map(item => {
            const itemTotal = item.product.price * item.quantity;
            totalPrice += itemTotal;

            return {
                product: item.product,
                quantity: item.quantity,
                itemTotal: itemTotal
            };
        });

        return {
            cartId: cart.id,
            userId: cart.userId,
            items: cartItems,
            totalItems: cartItems.length,
            totalPrice: totalPrice,
            createdAt: cart.createdAt,
            updatedAt: cart.updatedAt
        };
    }
}
