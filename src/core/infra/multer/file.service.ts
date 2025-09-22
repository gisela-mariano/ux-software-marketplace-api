import { Injectable } from "@nestjs/common";
import { AppConfigService } from "../config/config.service";

@Injectable()
export class FileService {

    constructor(private readonly appConfigService: AppConfigService) {}

    getFileUrl(filename: string) {
        return `${this.appConfigService.baseUrl}/${filename}`;
    }
}