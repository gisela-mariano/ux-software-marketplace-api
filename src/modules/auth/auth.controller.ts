import { Body, Controller, Post } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from './commands/dto/login.dto';
import { RegisterDto } from './commands/dto/register.dto';
import { LoginCommand } from './commands/impl/login.command';
import { RegisterCommand } from './commands/impl/register.command';
import { Public } from './decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({
    status: 201,
    example: {
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
      },
      accessToken: 'token jwt',
    },
  })
  @ApiResponse({
    status: 401,
    example: {
      message: 'Invalid credentials',
      statusCode: 401,
    },
  })
  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(loginDto));
  }

  @ApiOperation({ summary: 'Register a user' })
  @ApiResponse({
    status: 201,
    example: {
      user: {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        role: 'admin',
        phone: '1234567890',
        cpf: '1234567890',
      },
      accessToken: 'token jwt',
    },
  })
  @ApiResponse({
    status: 409,
    example: {
      message: 'User already exists',
      statusCode: 409,
    },
  })
  @Post('register')
  @Public()
  async register(@Body() registerDto: RegisterDto) {
    return this.commandBus.execute(new RegisterCommand(registerDto));
  }
}
