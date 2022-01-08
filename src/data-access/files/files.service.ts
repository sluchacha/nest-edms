import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFileDto } from '@data-access-dtos/files';
import { extname } from 'path';

@Injectable()
export class FilesService {
  upload(file: CreateFileDto, body: any) {
    return { body, file };
  }

  //async download(fileId: string): Promise<Buffer> {
  download(fileId: string) {
    const list = [
      {
        fieldname: 'file',
        originalname: 'SunCulture Careers.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        destination: './upload',
        filename: '13bb3b1431c510a2947d5b235731b571',
        path: 'upload\\13bb3b1431c510a2947d5b235731b571',
        size: 137640,
      },
      {
        fieldname: 'kra',
        originalname: 'Screenshot_20210901-110405_WhatsApp.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: './upload',
        filename: '0fd358b14332f3d6cf23799ecea3b516',
        path: 'upload\\0fd358b14332f3d6cf23799ecea3b516',
        size: 192199,
      },
      {
        fieldname: 'file',
        originalname: 'Screenshot_20210630-075753_Netflix.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: './upload',
        filename: '332a172648bf846eacd09e316ece24e0',
        path: 'upload\\332a172648bf846eacd09e316ece24e0',
        size: 430178,
      },
      {
        fieldname: 'file',
        originalname: 'Screenshot_20210429-024144_Chrome.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: './upload',
        filename: '9107b99107345166ad8523d444d0cb45',
        path: 'upload\\9107b99107345166ad8523d444d0cb45',
        size: 220070,
      },
      {
        fieldname: 'file',
        originalname: 'Screenshot_20210524-175311_WhatsApp.jpg',
        encoding: '7bit',
        mimetype: 'image/jpeg',
        destination: './upload',
        filename: 'efd65519a93ad6aecec497f216222e82',
        path: 'upload\\efd65519a93ad6aecec497f216222e82',
        size: 374718,
      },
      {
        fieldname: 'file',
        originalname: 'KRA Tax Compliance.pdf',
        encoding: '7bit',
        mimetype: 'application/pdf',
        destination: './upload',
        filename: 'b61d99bca1dbc98456ea787cad506984',
        path: 'upload\\b61d99bca1dbc98456ea787cad506984',
        size: 17717,
      },
    ];

    let item = list.find((f) => f.filename === fileId);
    const found = {
      ...item,
      newFileName: `${item.fieldname.toUpperCase()}${extname(
        item.originalname,
      )}`,
    };
    console.log(found.newFileName);

    if (!found) throw new NotFoundException('File not found');

    return found;
  }

  /* fileFilter(req: any, file: any, cb: any) {
      if (['image/jpeg', 'image/jpg', 'image/png'].includes(file.mimetype)) {
        cb(null, true);
      } else {
        cb(null, false);
      }
      // Alternative
  
      //allowed ext
      const filetypes = /jpeg|jpg|png|gif/;
      //check ext
      const extname = filetypes.test(extname(file.originalname));
      //check mime
      const mimetype = filetypes.test(file.mimetype);
  
      if (mimetype && extname) {
        return cb(null, true);
      } else {
        cb('Error: Images Only');
      }
    } */

  remove(id: string) {
    return `This action removes a #${id} file`;
  }
}
