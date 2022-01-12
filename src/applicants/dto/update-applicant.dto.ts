import { PartialType } from '@nestjs/swagger'; //'@nestjs/mapped-types'
import { CreateApplicantDto } from './create-applicant.dto';

export class UpdateApplicantDto extends PartialType(CreateApplicantDto) {}
