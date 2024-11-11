import { IsNotEmpty } from 'class-validator';

export class CreateAlbumDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  year: number;

  artistId: string | null;
}
