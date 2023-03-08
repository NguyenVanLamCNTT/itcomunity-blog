import * as admin from 'firebase-admin';
import { CommonConstants } from 'src/domain/constants';
export class FirebaseUtil {
  async uploadFile(file: any) {
    const bucket = admin.storage().bucket();
    const blob = bucket.file(file.originalname);
    console.log(blob.name);

    const blobWriter = await blob.createWriteStream({
      metadata: {
        contentType: file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: CommonConstants.TOKEN_FIREBASE,
        },
      },
    });

    blobWriter.on('error', (error) => {
      console.log(error);

      return undefined;
    });

    blobWriter.on('finish', () => undefined);

    blobWriter.end(file.buffer);
  }
  getUrlUpload(fileName: string): string {
    return `https://firebasestorage.googleapis.com/v0/b/itcommunity-6a31a.appspot.com/o/${fileName}?alt=media&token=${CommonConstants.TOKEN_FIREBASE}`;
  }
}
