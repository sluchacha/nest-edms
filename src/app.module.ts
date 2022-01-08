import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
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
import { FeatureConfigModule } from '@feature-config/feature-config.module';
import {
  MongoConfiguration,
  mongoConfiguration,
  MulterConfiguration,
  multerConfiguration,
} from './utils-config';
import { MulterModule } from '@nestjs/platform-express';
import { DataAccessModule } from '@data-access/data-access.module';

@Module({
  imports: [
    DataAccessModule,
    ApplicantsModule,
    ApplicationsModule,
    JobsModule,
    OrganizationsModule,
    MongooseModule.forRootAsync({
      inject: [mongoConfiguration.KEY],
      useFactory: (config: MongoConfiguration) => {
        return {
          uri: config.uri,
          dbName: config.dbName,
        };
      },
    }),
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
