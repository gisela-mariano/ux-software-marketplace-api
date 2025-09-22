import { QueryHandler, IQueryHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/core/infra/database/prisma.service";
import { NotFoundException } from "@nestjs/common";
import { GetCartQuery } from "../get-cart.query";
import { FileService } from "src/core/infra/multer/file.service";

@QueryHandler(GetCartQuery)
export class GetCartHandler implements IQueryHandler<GetCartQuery> {
    constructor(
        private readonly prismaService: PrismaService, 
        private readonly fileService: FileService
    ) {}

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

        let totalPrice = 0;
        const cartItems = cart.products.map(item => {
            const itemTotal = item.product.price * item.quantity;
            totalPrice += itemTotal;

            return {
                product: {
                    ...item.product,
                    imageUrl: this.fileService.getFileUrl(item.product.imageUrl)
                },
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
