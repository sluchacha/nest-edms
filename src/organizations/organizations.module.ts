import { Module } from '@nestjs/common';
import { OrganizationsController } from './organizations.controller';

@Module({
  controllers: [OrganizationsController],
  providers: [],
})
export class OrganizationsModule {}
