import { NotFoundException } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/core/infra/database/prisma.service';
import { DeleteProductCommand } from '../impl/delete-product.command';

@CommandHandler(DeleteProductCommand)
export class DeleteProductHandler
  implements ICommandHandler<DeleteProductCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: DeleteProductCommand) {
    const { id } = command.data;

    try {
      const product = await this.prismaService.product.delete({
        where: { id },
      });
      return { message: 'Product deleted successfully', product };
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
}
