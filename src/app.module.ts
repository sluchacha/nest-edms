import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ApplicantsModule } from './applicants/applicants.module';
import { ApplicationsModule } from './applications/applications.module';
import { JobsModule } from './jobs/jobs.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { CommonModule } from './common/common.module';
import { FilesModule } from './files/files.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { FeatureConfigModule } from './feature-config/feature-config.module';
import {
  MulterConfiguration,
  multerConfiguration,
} from './feature-config/configuration';
import { MulterModule } from '@nestjs/platform-express';
import { DatabaseModule } from './database/database.module';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ApplicantsModule,
    ApplicationsModule,
    JobsModule,
    OrganizationsModule,
    MulterModule.registerAsync({
      inject: [multerConfiguration.KEY],
      useFactory: (config: MulterConfiguration) => {
        return {
          dest: config.dest,
          fileFilter: config.fileFilter,
          limits: config.limits,
        };
      },
    }),
    FilesModule,
    CommonModule,
    UsersModule,
    AuthModule,
    FeatureConfigModule,
    DatabaseModule,
    HealthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
