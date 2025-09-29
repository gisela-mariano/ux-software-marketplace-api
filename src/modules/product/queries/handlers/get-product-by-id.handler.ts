import { NotFoundException } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/core/infra/database/prisma.service';
import { FileService } from 'src/core/infra/multer/file.service';
import { GetProductByIdQuery } from '../impl/get-product-by-id.query';

@QueryHandler(GetProductByIdQuery)
export class GetProductByIdHandler
  implements IQueryHandler<GetProductByIdQuery>
{
  constructor(
    private readonly prismaService: PrismaService,
    private readonly fileService: FileService,
  ) {}

  async execute(query: GetProductByIdQuery) {
    const { id } = query.data;

    const product = await this.prismaService.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return {
      ...product,
      imageUrl: product.imageUrl.includes('http')
        ? product.imageUrl
        : this.fileService.getFileUrl(product.imageUrl),
    };
  }
}
