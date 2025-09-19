export class RegisterCommand {
    constructor(
        public readonly data: {
            name: string;
            email: string;
            password: string;
        }
    ) {}
}