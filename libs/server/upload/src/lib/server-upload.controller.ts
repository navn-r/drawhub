import { Controller } from '@nestjs/common';
import { ServerUploadService } from './server-upload.service';

@Controller('server-upload')
export class ServerUploadController {
  constructor(private serverUploadService: ServerUploadService) {}
}
