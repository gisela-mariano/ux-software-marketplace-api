import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { PrismaService } from "src/core/infra/database/prisma.service";
import { RegisterCommand } from "../impl/register.command";
import { ConflictException } from "@nestjs/common";
import { hash } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";

@CommandHandler(RegisterCommand)
export class RegisterHandler implements ICommandHandler<RegisterCommand> {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) { }
    async execute(command: RegisterCommand) {
        const { name, email, password, phone, cpf } = command.data

        const user = await this.prismaService.user.findUnique({
            where: {
                email,
            }
        });

        if (user) {
            throw new ConflictException('User already exists')
        }

        const hashedPassword = await hash(password, 10);

        const userWithCpf = await this.prismaService.user.findUnique({
            where: {
                cpf
            }
        });

        if (userWithCpf) {
            throw new ConflictException('User with cpf already exists')
        }

        const userCreated = await this.prismaService.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
                role: Role.USER,
                phone,
                cpf
            }
        });

        await this.prismaService.cart.create({
            data: {
                userId: userCreated.id
            }
        })

        const payload = {
            sub: userCreated.id,
            email: userCreated.email,
            role: userCreated.role
        };

        const accessToken = await this.jwtService.signAsync(payload);

        return {
            user: {
                id: userCreated.id,
                name: userCreated.name,
                email: userCreated.email,
                phone: userCreated.phone,
                cpf: userCreated.cpf,
                role: userCreated.role
            }, accessToken
        }
    }
}