
export class GetProductsQuery {
    constructor(public readonly data: {
        page: number;
        limit: number;
        name?: string;
        description?: string;
        price?: number;
    }) { }
}