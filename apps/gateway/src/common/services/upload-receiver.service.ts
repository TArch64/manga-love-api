import { Inject, Injectable } from '@nestjs/common';
import { IUploadIllustrationRequest } from '@manga-love-api/uploader/types';
import { UploaderStorageService } from '@manga-love-api/core/uploader-storage';
import { FileUpload } from '../types';

@Injectable()
export class UploadReceiverService {
    @Inject()
    private uploaderService: UploaderStorageService;

    public async receiveFile(upload: FileUpload): Promise<IUploadIllustrationRequest> {
        return {
            objectId: await this.uploaderService.storeObject(upload.createReadStream()),
            filename: upload.filename,
            mimetype: upload.mimetype,
        };
    }
}
