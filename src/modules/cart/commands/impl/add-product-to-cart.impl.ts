export class AddProductToCartImpl {
    constructor(public readonly data: {
        productId: string;
        quantity: number;
        userId: string;
    }) {}
}