export class RegisterCommand {
    constructor(
        public readonly data: {
            phone: string;
            cpf: string;
            name: string;
            email: string;
            password: string;
        }
    ) { }
}