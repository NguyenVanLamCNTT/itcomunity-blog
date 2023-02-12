import {
  Controller,
  HttpCode,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { UploadDMSResponseModel } from 'src/presentation/models';
import { JwtAuthGuard } from '../auth/auth.guard';
import { DMSService } from './dms.service';

@ApiBearerAuth()
@ApiTags('api/dms')
@Controller('api/dms')
export class DMSControler {
  constructor(private dmsService: DMSService) {}

  @ApiResponse({ type: UploadDMSResponseModel })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @UseGuards(JwtAuthGuard)
  @HttpCode(200)
  async upload(@UploadedFile('file') file: any) {
    return await this.dmsService.upload(file);
  }
}
