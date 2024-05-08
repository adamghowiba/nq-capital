import { Module, Global } from '@nestjs/common';
import { IamService } from './iam.service';

@Global()
@Module({
  controllers: [],
  providers: [IamService],
  exports: [IamService],
})
export class IamModule {}
