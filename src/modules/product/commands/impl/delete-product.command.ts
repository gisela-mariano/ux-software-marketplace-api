export class DeleteProductCommand {
  constructor(public readonly data: {
    id: string;
  }) {}
}
