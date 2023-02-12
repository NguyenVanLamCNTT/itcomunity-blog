import { Injectable } from '@nestjs/common';
import { FirebaseUtil } from 'src/infrastructure/utilities';
import { UploadDMSResponseModel } from 'src/presentation/models';
import { RequestCorrelation } from 'src/utility';

@Injectable({})
export class DMSService {
  constructor(private firebaseUtil: FirebaseUtil) {}

  async upload(file: any) {
    await this.firebaseUtil.uploadFile(file);
    const fileName = this.firebaseUtil.getUrlUpload(file.originalname);
    return new UploadDMSResponseModel({
      id: RequestCorrelation.getRequestId(),
      data: { fileName },
    });
  }
}
