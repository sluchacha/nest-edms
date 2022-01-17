import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Applicant, ApplicantSchema } from '../applicants/entities';
import { Job, JobSchema } from '../jobs/entities';
import { ApplicationsController } from './applications.controller';
import { ApplicationsService } from './applications.service';
import { Application, ApplicationSchema } from './entities';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Applicant.name,
        schema: ApplicantSchema,
      },
      {
        name: Application.name,
        schema: ApplicationSchema,
      },
      {
        name: Job.name,
        schema: JobSchema,
      },
    ]),
  ],
  controllers: [ApplicationsController],
  providers: [ApplicationsService],
  exports: [ApplicationsService],
})
export class ApplicationsModule {}
