import { Module } from '@nestjs/common';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from 'src/config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [EpisodesController],
  providers: [EpisodesService],
})
export class EpisodesModule {}
