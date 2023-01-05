import { Readable } from 'stream';

export class UploadingFile {
    public static fromReadable(stream: Readable, name: string, type: string): Promise<UploadingFile> {
        return new Promise((resolve, reject) => {
            const chunks = [];

            const create = (): UploadingFile => {
                return new UploadingFile(name, new Blob(chunks, { type }));
            };

            stream
                .on('data', (chunk) => chunks.push(chunk))
                .once('end', () => resolve(create()))
                .once('error', (error) => reject(error));
        });
    }

    constructor(
        public name: string,
        public source: Blob,
    ) {}

    public get type(): string {
        return this.source.type;
    }
}
