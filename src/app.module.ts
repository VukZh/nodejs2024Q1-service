import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ArtistController } from './artist/artist.controller';
import { ArtistModule } from './artist/artist.module';
import { TrackModule } from './track/track.module';
import { AlbumController } from './album/album.controller';
import { AlbumModule } from './album/album.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [UserModule, ArtistModule, TrackModule, AlbumModule, FavoritesModule],
  controllers: [AppController, ArtistController, AlbumController],
  providers: [AppService],
})
export class AppModule {}
