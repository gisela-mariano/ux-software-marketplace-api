import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./commands/dto/login.dto";
import { Public } from "./decorators/public.decorator";
import { CommandBus } from "@nestjs/cqrs";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { LoginCommand } from "./commands/impl/login.command";

@Controller('auth')
export class AuthController {

  constructor(private readonly commandBus: CommandBus) {}

  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 201, description: 'User logged in successfully' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Post('login')
  @Public()
  async login(@Body() loginDto: LoginDto) {
    return this.commandBus.execute(new LoginCommand(loginDto))
  }
}