import { IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class GetProductByIdDto {
  @ApiProperty({ description: 'Product ID', example: 'uuid-string' })
  @IsUUID()
  id: string;
}
