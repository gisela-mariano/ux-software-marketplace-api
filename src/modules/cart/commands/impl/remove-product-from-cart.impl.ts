export class RemoveProductFromCartImpl {
    constructor(public readonly data: {
        productId: string;
        userId: string;
    }) {}
}
