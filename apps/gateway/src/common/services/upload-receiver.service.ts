import { Injectable } from '@nestjs/common';
import { UploadingFile } from '@manga-love-api/uploader/types';
import { FileUpload } from '../types';

@Injectable()
export class UploadReceiverService {
    public async receiveFile(input: Promise<FileUpload>): Promise<UploadingFile> {
        const upload = await input;
        return UploadingFile.fromReadable(upload.createReadStream(), upload.filename, upload.mimetype);
    }
}
