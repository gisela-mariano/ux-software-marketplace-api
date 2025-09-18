import { Controller, Get } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

@Controller()
export class AppController {
  constructor(private readonly configService: ConfigService) {}

  @Get()
  getHello() {
    const port = this.configService.get('PORT');
    return {
      message: `Server is running on port ${port}`,
    };
  }
}   