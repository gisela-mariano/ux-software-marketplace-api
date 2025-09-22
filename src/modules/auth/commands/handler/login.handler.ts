import { CommandHandler, ICommandHandler } from "@nestjs/cqrs";
import { LoginCommand } from "../impl/login.command";
import { PrismaService } from "src/core/infra/database/prisma.service";
import { NotFoundException, UnauthorizedException } from "@nestjs/common";
import { compare } from "bcryptjs";
import { JwtService } from "@nestjs/jwt";

@CommandHandler(LoginCommand)
export class LoginHandler implements ICommandHandler<LoginCommand> {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly jwtService: JwtService
    ) { }
    async execute(command: LoginCommand) {
        const { email, password } = command.data

        const user = await this.prismaService.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const isPasswordValid = await compare(password, user.password)

        if (!isPasswordValid) {
            throw new UnauthorizedException('Invalid credentials')
        }

        const payload = {
            sub: user.id,
            email: user.email,
            role: user.role
        }

        const accessToken = await this.jwtService.signAsync(payload)

        return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                cpf: user.cpf
            },
            accessToken
        }
    }
}