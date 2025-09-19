import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AppConfigService } from "../../core/infra/config/config.service";
import { AuthController } from "./auth.controller";

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
})
export class AuthModule {}