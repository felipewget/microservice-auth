import { IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class SendRecoveryTokenDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    application: string;
}