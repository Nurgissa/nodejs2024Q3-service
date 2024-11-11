import { IsNotEmpty } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  duration: number;

  artistId: string | null;

  albumId: string | null;
}
