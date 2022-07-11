import { ServerAuthModule } from '@drawhub/server/auth';
import { ServerCanvasModule } from '@drawhub/server/canvas';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot({ envFilePath: `.env` })],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ServerAuthModule,
    ServerCanvasModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
