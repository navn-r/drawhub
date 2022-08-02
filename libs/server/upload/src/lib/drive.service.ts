import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map, mergeMap } from 'rxjs';

@Injectable()
export class DriveService {
  constructor(private httpService: HttpService) {}

  async upload(file: Express.Multer.File, accessToken: string, canvasId: string) {
    const req = this.httpService
      .post('https://www.googleapis.com/upload/drive/v3/files', file.buffer, {
        headers: {
          'content-type': 'image/png',
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .pipe(
        map((res) => res.data?.id),
        mergeMap((fileId) =>
          this.httpService.patch(
            'https://www.googleapis.com/drive/v3/files/' + fileId,
            {
              mimeType: 'image/png',
              name: canvasId + '_' + new Date().toISOString(),
              description: 'Drawhub Canvas Upload - ' + canvasId,
            },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
        ),
        map((res) => res.data)
      );

    return firstValueFrom(req);
  }
}
