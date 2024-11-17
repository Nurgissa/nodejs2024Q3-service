import { Injectable } from '@nestjs/common';
import { TrackService } from '../track/track.service';
import { AlbumService } from '../album/album.service';
import { ArtistService } from '../artist/artist.service';

@Injectable()
export class FavoriteService {
  constructor(
    private readonly trackService: TrackService,
    private readonly albumService: AlbumService,
    private readonly artistService: ArtistService,
  ) {}

  async findAll() {
    return {
      artists: await this.artistService.getFavoriteArtist(),
      albums: await this.albumService.getFavoriteAlbums(),
      tracks: await this.trackService.getFavoriteTracks(),
    };
  }

  favoriteTrack(id: string) {
    return this.trackService.favorite(id);
  }

  unfavoriteTrack(id: string) {
    return this.trackService.unfavorite(id);
  }

  favoriteAlbum(id: string) {
    return this.albumService.favorite(id);
  }

  unfavoriteAlbum(id: string) {
    return this.albumService.unfavorite(id);
  }

  favoriteArtist(id: string) {
    return this.artistService.favorite(id);
  }

  unfavoriteArtist(id: string) {
    return this.artistService.unfavorite(id);
  }
}
