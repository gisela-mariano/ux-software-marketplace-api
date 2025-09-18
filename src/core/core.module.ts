import { Module } from "@nestjs/common";
import { PrismaService } from "./infra/database/prisma.service";

@Module({
  imports: [],
  controllers: [],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class CoreModule {}