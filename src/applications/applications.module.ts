import { Module } from '@nestjs/common';
import { ApplicationsController } from './applications.controller';

@Module({
  controllers: [ApplicationsController],
  providers: [],
  exports: [],
})
export class ApplicationsModule {}
