import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./infra/database/prisma.service";
import { AppConfigService } from "./infra/config/config.service";
import { MulterConfigService } from "./infra/multer/multer-config.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService, 
    AppConfigService, 
    MulterConfigService
  ],
  exports: [
    PrismaService,
    AppConfigService,
    MulterConfigService
  ],
})
export class CoreModule {}