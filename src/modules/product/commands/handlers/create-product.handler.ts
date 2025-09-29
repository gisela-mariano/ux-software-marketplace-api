import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/core/infra/database/prisma.service';
import { CreateProductCommand } from '../impl/create-product.command';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: CreateProductCommand) {
    const { name, description, imageUrl, price } = command.data;

    const product = await this.prismaService.product.create({
      data: {
        name,
        description,
        imageUrl,
        price,
      },
    });

    return product;
  }
}
