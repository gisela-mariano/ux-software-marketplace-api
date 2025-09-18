import { Injectable } from "@nestjs/common";
import { PrismaClient } from "generated/prisma";

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
            log: ['error', 'warn'],
            errorFormat: 'pretty'
        })
    }
}