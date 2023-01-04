import { Stream } from 'stream';
import { Field, InputType } from '@nestjs/graphql';
import GraphQLUpload from 'graphql-upload/GraphQLUpload.js';

export interface FileUpload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}

@InputType()
export class CreateIllustrationInput {
    @Field((returns) => GraphQLUpload)
    public file: Promise<FileUpload>;
}
