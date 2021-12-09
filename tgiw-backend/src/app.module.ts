import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { configuration, configValidationSchema } from './config';
import { SpotifyModule } from './spotify/spotify.module';

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
    SpotifyModule,
  ],
})
export class AppModule {}
