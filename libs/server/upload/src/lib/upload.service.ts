import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as dotenv from 'dotenv';

/* Needed it for implicit usage */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import * as multer from 'multer';

dotenv.config();

AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
  region: process.env.AWS_BUCKET_REGION,
});

const s3 = new AWS.S3();

@Injectable()
export class UploadService {
  async uploadImage(file: Express.Multer.File, canvasId: string) {
    const params = {
      Body: file.buffer,
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: canvasId + '.png',
      ContentType: 'image/png',
    };
    return s3.putObject(params).promise();
  }

  async deleteImage(canvasId: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: canvasId + '.png',
    };
    return s3.deleteObject(params).promise();
  }

  async getImage(canvasId: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: canvasId + '.png',
    };

    // New canvases will not have an s3 object until saved
    return await s3.getObject(params).promise();
  }

  async stitchImage(originalCanvasId: string, stitchedCanvasId: string) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      CopySource: `${process.env.AWS_BUCKET_NAME}/${originalCanvasId}.png`,
      Key: stitchedCanvasId + '.png',
    };
    return s3.copyObject(params).promise();
  }
}
