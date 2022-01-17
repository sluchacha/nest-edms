import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApplicantsController } from './applicants.controller';
import { ApplicantsService } from './applicants.service';
import { Applicant, ApplicantSchema } from './entities';
import { Application, ApplicationSchema } from '../applications/entities';

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
    ]),
  ],
  controllers: [ApplicantsController],
  providers: [ApplicantsService],
  exports: [ApplicantsService],
})
export class ApplicantsModule {}
