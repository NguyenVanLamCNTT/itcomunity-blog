import { Module } from '@nestjs/common';
import { FirebaseUtil } from 'src/infrastructure/utilities';
import { DMSControler } from './dms.controller';
import { DMSService } from './dms.service';

@Module({
  imports: [],
  controllers: [DMSControler],
  providers: [DMSService, FirebaseUtil],
})
export class DMSModule {}
