import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './usuario/usuario.module';
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
    UsuarioModule,
    AuthModule,
    GeneralmoduleModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
