import { IsEmail, IsNotEmpty, MinLength, MaxLength } from "class-validator";

export class RemoveAuthDto {

    @IsEmail()
    email: string;

    @IsNotEmpty()
    @MinLength(6)
    @MaxLength(20)
    password: string;

    @IsNotEmpty()
    application: string;

}