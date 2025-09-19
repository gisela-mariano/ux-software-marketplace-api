export class UpdateProductCommand {
  constructor(public readonly data: {
    id: string;
    name?: string;
    description?: string;
    imageUrl?: string;
    price?: number;
  }) {}
}
