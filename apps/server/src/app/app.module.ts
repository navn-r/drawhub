import { ServerAuthModule } from '@drawhub/server/auth';
import { ServerCanvasModule } from '@drawhub/server/canvas';
import { ServerUploadModule } from '@drawhub/server/upload';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      useGlobalPrefix: true,
      include: [ServerCanvasModule],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forRoot({ envFilePath: `.env` })],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URI'),
      }),
      inject: [ConfigService],
    }),
    ServerAuthModule,
    ServerCanvasModule,
    ServerUploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
