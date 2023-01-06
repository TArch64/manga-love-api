import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PrismaService, Work } from '@manga-love-api/database';
import { firstValueFrom } from 'rxjs';
import { UploaderCommand } from '@manga-love-api/uploader/uploader.command';
import { ICreateWorkRequest } from '../types';
import { Microservices } from '../work.microservices';

@Injectable()
export class CreateWorkService {
    @Inject(Microservices.UPLOADER)
    private uploaderMicroservice: ClientProxy;

    @Inject()
    private prisma: PrismaService;

    public async create(payload: ICreateWorkRequest): Promise<Work> {
        const illustrationId = await firstValueFrom<string>(
            this.uploaderMicroservice.send(UploaderCommand.UPLOAD_ILLUSTRATION, payload.illustration),
        );

        return this.prisma.work.create({
            data: {
                titleEn: payload.titleEn,
                titleUa: payload.titleUa,
                thumbnailId: illustrationId,

                categories: {
                    createMany: {
                        data: payload.categories.map((categoryId) => ({
                            categoryId,
                        })),
                    },
                },
            },
        });
    }
}
