import { AuthModule } from '@drawhub/server/auth';
import { CanvasModule } from '@drawhub/server/canvas';
import { UploadModule } from '@drawhub/server/upload';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { ServerEmailModule } from '@drawhub/server/email';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      useGlobalPrefix: true,
      include: [CanvasModule],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot({ envFilePath: `.env` })],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    CanvasModule,
    UploadModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    ServerEmailModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
