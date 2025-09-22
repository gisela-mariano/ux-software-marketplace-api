import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail } from 'class-validator';

export class RegisterDto {
    @ApiProperty({
        description: 'The name of the user',
        example: 'John Doe',
    })
    @IsString()
    name: string;

    @ApiProperty({
        description: 'The email of the user',
        example: 'john.doe@example.com',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        description: 'The password of the user',
        example: '123456',
    })
    @IsString()
    password: string;

    @ApiProperty({
        description: 'The phone of the user',
        example: '1234567890',
    })
    @IsString()
    phone: string;

    @ApiProperty({
        description: 'The cpf of the user',
        example: '1234567890',
    })
    @IsString()
    cpf: string;
}
