import { IQueryHandler, QueryHandler } from "@nestjs/cqrs";
import { GetProductsQuery } from "../impl/get-products.query";
import { PrismaService } from "src/core/infra/database/prisma.service";
import { FileService } from "src/core/infra/multer/file.service";

@QueryHandler(GetProductsQuery)
export class GetProductsHandler implements IQueryHandler<GetProductsQuery> {
    constructor(private readonly prismaService: PrismaService, private readonly fileService: FileService) {}
    async execute(query: GetProductsQuery) {
        const { page, limit, description, name, price } = query.data;
        
        const whereClause: any = {};
        
        let pageNumber = page ?? 1;
        let limitNumber = limit ?? 10;
        
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
            skip: (pageNumber - 1) * limitNumber,
            take: Number(limitNumber),
            orderBy: { createdAt: 'desc' }
        });

        return {
            page: Number(pageNumber),
            limit: Number(limitNumber),
            total,
            products: products.map(product => ({
                ...product,
                imageUrl: this.fileService.getFileUrl(product.imageUrl)
            }))
        }
    }
}