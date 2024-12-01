import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistModule } from './artist/artist.module';
import { AlbumModule } from './album/album.module';
import { TrackModule } from './track/track.module';
import { FavoriteModule } from './favorite/favorite.module';
import { APP_FILTER, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { FavoriteTrackModule } from './favorite/track/favorite-track.module';
import { FavoriteArtistModule } from './favorite/artist/favorite-artist.module';
import { FavoriteAlbumModule } from './favorite/album/favorite-album.module';
import { JsonContentTypeMiddleware } from './json-content-type.middleware';
import { AuthModule } from './auth/auth.module';
import { CustomExceptionFilter } from './custom-exception.filter';
import { LoggerModule } from './logger/logger.module';
import { LoggingInterceptor } from './logging.interceptor';

@Module({
  imports: [
    UserModule,
    AlbumModule,
    ArtistModule,
    TrackModule,
    FavoriteModule,
    FavoriteTrackModule,
    FavoriteArtistModule,
    FavoriteAlbumModule,
    RouterModule.register([
      {
        path: 'favs',
        module: FavoriteModule,
        children: [
          {
            path: 'track',
            module: FavoriteTrackModule,
          },
          {
            path: 'artist',
            module: FavoriteArtistModule,
          },
          {
            path: 'album',
            module: FavoriteAlbumModule,
          },
        ],
      },
    ]),
    AuthModule,
    LoggerModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    JsonContentTypeMiddleware,
    {
      provide: APP_FILTER,
      useClass: CustomExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
