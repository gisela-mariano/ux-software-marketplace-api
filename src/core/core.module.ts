import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./infra/database/prisma.service";
import { AppConfigService } from "./infra/config/config.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [
    PrismaService,
    AppConfigService
  ],
})
export class CoreModule {}