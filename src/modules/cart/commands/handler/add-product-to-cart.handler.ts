import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { PrismaService } from 'src/core/infra/database/prisma.service';
import { AddProductToCartImpl } from '../impl/add-product-to-cart.impl';

@CommandHandler(AddProductToCartImpl)
export class AddProductToCartHandler
  implements ICommandHandler<AddProductToCartImpl>
{
  constructor(private readonly prismaService: PrismaService) {}

  async execute(command: AddProductToCartImpl) {
    const { productId, quantity, userId } = command.data;

    let cart = await this.prismaService.cart.findUnique({
      where: {
        userId,
      },
      // include: {
      //   products: {
      //     select: {
      //       product: true,
      //     },
      //   },
      // },
    });

    // if (!cart) {
    //   throw new NotFoundException('Cart not found');
    // }

    // const productInCart = await this.prismaService.productInCart.findFirst({
    //   where: {
    //     productId,
    //     cartId: cart.id,
    //   },
    // });

    let updatedProductInCart;

    // if (productInCart) {
    //   updatedProductInCart = await this.prismaService.productInCart.update({
    //     where: {
    //       productId_cartId: {
    //         productId,
    //         cartId: cart.id,
    //       },
    //     },
    //     data: {
    //       quantity: productInCart.quantity + quantity,
    //     },
    //     include: {
    //       product: true,
    //     },
    //   });
    // } else {
    //   updatedProductInCart = await this.prismaService.productInCart.create({
    //     data: {
    //       productId,
    //       cartId: cart.id,
    //       quantity,
    //     },
    //     include: {
    //       product: true,
    //     },
    //   });
    // }

    if (!cart) {
      cart = await this.prismaService.cart.create({
        data: {
          userId,
        },
      });
    }

    const productInCart = await this.prismaService.productInCart.findFirst({
      where: {
        productId,
        cartId: cart.id,
      },
    });

    if (productInCart) {
      updatedProductInCart = await this.prismaService.productInCart.update({
        where: {
          productId_cartId: {
            productId,
            cartId: cart.id,
          },
        },
        data: {
          quantity: productInCart.quantity + quantity,
        },
        include: {
          product: true,
        },
      });
    } else {
      // const createdCart = await this.prismaService.cart.create({
      //   data: {
      //     userId,
      //   },
      // });

      updatedProductInCart = await this.prismaService.productInCart.create({
        data: {
          productId,
          cartId: cart.id,
          quantity,
        },
        include: {
          product: true,
        },
      });
    }

    return {
      product: updatedProductInCart.product,
      quantity: updatedProductInCart.quantity,
    };
  }
}
