export class DecreaseProductQuantityImpl {
    constructor(public readonly data: {
        productId: string;
        quantity: number;
        userId: string;
    }) {}
}
