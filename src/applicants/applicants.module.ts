import { Module } from '@nestjs/common';
import { ApplicantsController } from './applicants.controller';

@Module({
  controllers: [ApplicantsController],
  providers: [],
  exports: [],
})
export class ApplicantsModule {}
