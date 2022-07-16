import { Injectable } from '@nestjs/common';

/* Even though typescript is complaining (its shit), we need it for implicit usage */
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const s3 = new AWS.S3();

@Injectable()
export class ServerUploadService {
  async uploadImage(file: Express.Multer.File, canvasId: string) {
    const params = {
      Body: file.buffer,
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: canvasId + '.png',
    };
    return s3.putObject(params).promise();
  }
}
