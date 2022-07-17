import { IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class GetValidRecoveryTokenDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    token: string;

    @IsNotEmpty()
    application: string;
}