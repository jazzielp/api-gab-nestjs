import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './usuario/user.module';
import { AuthModule } from './auth/auth.module';
import { GeneralmoduleModule } from './generalmodule/generalmodule.module';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
      }),
    }),
    UserModule,
    AuthModule,
    GeneralmoduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
