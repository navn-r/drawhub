import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';

@Injectable()
export class DriveService {
  constructor(private httpService: HttpService) {}

  async upload(file: Express.Multer.File, accessToken: string, canvasId: string) {
    console.log(canvasId);
    // TODO: Investigate how to add metadata into file.
    const req = this.httpService
      .post('https://www.googleapis.com/upload/drive/v3/files', file.buffer, {
        headers: {
          'content-type': 'image/png',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(map((res) => res.data));

    return firstValueFrom(req);
  }
}
