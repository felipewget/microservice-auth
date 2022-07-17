import { IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class UpdatePasswordRecoveryTokenDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    token: string;

    @IsNotEmpty()
    application: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    new_password: string;
}