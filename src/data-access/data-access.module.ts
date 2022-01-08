import { Global, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Applicant, ApplicantSchema } from './applicants/applicant.entity';
import {
  Application,
  ApplicationSchema,
} from './applications/application.entity';
import { Job, JobSchema } from './jobs/job.entity';
import {
  Organization,
  OrganizationSchema,
} from './organizations/organization.entity';
import { ApplicantsService } from './applicants/applicants.service';
import { ApplicationsService } from './applications/applications.service';
import { JobsService } from './jobs/jobs.service';
import { OrganizationsService } from './organizations/organizations.service';
import { UsersService } from './users/users.service';
import { FilesService } from './files/files.service';
import { File, FileSchema } from './files/file.entity';
import { User, UserSchema } from './users/user.entity';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
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
      {
        name: Organization.name,
        schema: OrganizationSchema,
      },
      {
        name: File.name,
        schema: FileSchema,
      },
    ]),
  ],
  providers: [
    ApplicantsService,
    ApplicationsService,
    JobsService,
    OrganizationsService,
    UsersService,
    FilesService,
  ],
  exports: [
    ApplicantsService,
    ApplicationsService,
    JobsService,
    OrganizationsService,
    UsersService,
    FilesService,
  ],
})
export class DataAccessModule {}
