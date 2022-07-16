export class UpdatePasswordRecoveryTokenDto {
    email: string;
    token: string;
    application: string;
    new_password: string;
}