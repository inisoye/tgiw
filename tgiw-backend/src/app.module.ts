import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { TypeOrmModule } from '@nestjs/typeorm';

import { configuration, configValidationSchema } from './config';
import { SpotifyModule } from './spotify/spotify.module';
import { SongsModule } from './songs/songs.module';
import { GenresModule } from './genres/genres.module';
import { ArtistsModule } from './artists/artists.module';
import { AuthModule } from './auth/auth.module';
import { HelpersModule } from './helpers/helpers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: configValidationSchema,
    }),
    LoggerModule.forRoot({
      pinoHttp:
        process.env.NODE_ENV === 'dev'
          ? {
              transport: {
                target: 'pino-pretty',
                options: {
                  colorize: true,
                  levelFirst: true,
                  translateTime: 'SYS:ddd mmm dd yyyy HH:MM:ss',
                },
              },
            }
          : {},
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          type: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
          host: configService.get('database.host'),
          port: configService.get('database.port'),
          username: configService.get('database.username'),
          password: configService.get('database.password'),
          database: configService.get('database.name'),
        };
      },
    }),
    SpotifyModule,
    SongsModule,
    GenresModule,
    ArtistsModule,
    AuthModule,
    HelpersModule,
  ],
})
export class AppModule {}
