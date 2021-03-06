import { Module } from '@nestjs/common';
import { AuthModule } from './app/auth/auth.module';
import { AnalyticsModule } from './app/analytics/analytics.module';
import { SessionModule } from './app/session/session.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecoverPasswordModule } from './app/recover-password/recover-password.module';
import { MailService } from './app/mail/mail.service';
import { MailModule } from './app/mail/mail.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      autoLoadEntities: true,
      synchronize: process.env.IS_PRODUCTION,
      logging: false
    }),
    AuthModule, AnalyticsModule, SessionModule, RecoverPasswordModule, MailModule
  ],
  controllers: [],
  providers: [MailService],
})
export class AppModule { }
