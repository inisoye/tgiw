import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { configuration, configValidationSchema } from './config';
import { SpotifyModule } from './spotify/spotify.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema: configValidationSchema,
    }),
    SpotifyModule,
  ],
})
export class AppModule {}
