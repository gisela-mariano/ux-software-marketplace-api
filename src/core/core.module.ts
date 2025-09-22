import { Global, Module } from "@nestjs/common";
import { PrismaService } from "./infra/database/prisma.service";
import { AppConfigService } from "./infra/config/config.service";
import { MulterConfigService } from "./infra/multer/multer-config.service";
import { FileService } from "./infra/multer/file.service";

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [
    PrismaService, 
    AppConfigService, 
    MulterConfigService,
    FileService
  ],
  exports: [
    PrismaService,
    AppConfigService,
    MulterConfigService,
    FileService
  ],
})
export class CoreModule {}