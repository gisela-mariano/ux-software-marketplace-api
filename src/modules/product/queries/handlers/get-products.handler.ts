import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductsQuery } from "../impl/get-products.query";
import { PrismaService } from "src/core/infra/database/prisma.service";

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
    constructor(private readonly prismaService: PrismaService) {}
    async execute(query: GetProductsQuery) {
        const { page, limit, description, name, price } = query.data;
        
        // Build where clause with LIKE filters
        const whereClause: any = {};
        
        if (name) {
            whereClause.name = { contains: name, mode: 'insensitive' };
        }
        
        if (description) {
            whereClause.description = { contains: description, mode: 'insensitive' };
        }
        
        if (price) {
            whereClause.price = price;
        }

        const total = await this.prismaService.product.count({
            where: whereClause
        });

        const products = await this.prismaService.product.findMany({
            where: whereClause,
            skip: (page - 1) * limit,
            take: Number(limit),
            orderBy: { createdAt: 'desc' }
        });

        return {
            page,
            limit,
            total,
            products
        }
    }
}