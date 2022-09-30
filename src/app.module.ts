import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGaurd } from './common/gaurds/access-token.gaurd';

// configs
// https://dev.to/vjnvisakh/using-env-in-nestjs-3040
ConfigModule.forRoot();

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGaurd, // use access-token-gaurd aon all routes
    },
  ],
})
export class AppModule {}
