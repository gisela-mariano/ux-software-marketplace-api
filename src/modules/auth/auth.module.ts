import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AppConfigService } from "../../core/infra/config/config.service";
import { AuthController } from "./auth.controller";
import { LoginHandler } from "./commands/handler/login.handler";
import { RegisterHandler } from "./commands/handler/register.handler";

@Module({
  imports: [
    JwtModule.registerAsync({
      global: true,
      useFactory: (configService: AppConfigService) => ({
        secret: configService.jwtSecret,
        signOptions: { expiresIn: '1h' }
      }),
      inject: [AppConfigService]
    })
  ],
  controllers: [AuthController],
  providers: [LoginHandler, RegisterHandler]
})
export class AuthModule {}