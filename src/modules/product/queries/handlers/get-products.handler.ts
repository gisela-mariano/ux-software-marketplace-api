import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductsQuery } from "../impl/get-products.query";
import { PrismaService } from "src/core/infra/database/prisma.service";

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
    constructor(private readonly prismaService: PrismaService) {}
    async execute(query: GetProductsQuery) {
        const { page, limit, description, name, price } = query.data;
        

        const total = await this.prismaService.product.count({
            where: {
                name: name,
                description: description,
                price: price
            }
        });

        const products = await this.prismaService.product.findMany({
            where: {
                name: name,
                description: description,
                price: price
            },
            skip: (page - 1) * limit,
            take: Number(limit)
        });

        return {
            page,
            limit,
            total,
            products
        }
    }
}