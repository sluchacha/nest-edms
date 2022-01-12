import { BadRequestException, Inject } from '@nestjs/common';
import { ConfigType, registerAs } from '@nestjs/config';
import { extname } from 'path';

export const multerConfiguration = registerAs('multer', () => {
  return {
    dest: process.env.MULTER_FILE_UPLOAD_PATH || './upload',
    limits: {
      fileSize: Number(process.env.MULTER_FILE_SIZE) || 2097152, //2 MB
    },
    fileFilter: (req, file, cb) => {
      if (!extname(file.originalname).match(/\.(pdf|jpg|jpeg|png|gif)$/))
        cb(
          new BadRequestException(
            `Unsupported file type ${extname(file.originalname)}`,
          ),
          false,
        );

      cb(null, true);
    },
  };
});

export type MulterConfiguration = ConfigType<typeof multerConfiguration>;

export const InjectMulterConfig = () => Inject(multerConfiguration.KEY);
