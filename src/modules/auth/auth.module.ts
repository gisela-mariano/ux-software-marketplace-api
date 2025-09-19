import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { AppConfigService } from "../../core/infra/config/config.service";

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
  controllers: [],
})
export class AuthModule {}