import { Controller, Get } from "@nestjs/common";
import { Public } from "./modules/auth/decorators/public.decorator";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller()
export class AppController {
  @Get()
  @Public()
  @ApiOperation({ summary: 'Get server status' })
  @ApiResponse({ status: 200, example: {
    message: 'Server is running'
  } })
  getHello() {
    return {
      message: 'Server is running'
    };
  }
}