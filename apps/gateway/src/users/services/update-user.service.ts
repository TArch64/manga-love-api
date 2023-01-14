import { Inject, Injectable } from '@nestjs/common';
import { PrismaService, User, UserEmailStatus } from '@manga-love-api/database';
import { firstValueFrom } from 'rxjs';
import { ClientProxy } from '@nestjs/microservices';
import { UploaderCommand } from '@manga-love-api/uploader/uploader.command';
import { AuthCommand } from '@manga-love-api/auth/auth.command';
import { UpdateUserInput, UserObject } from '../types';
import { FileUpload } from '../../common/types';
import { Microservices } from '../../gateway.microservices';
import { UploadReceiverService } from '../../common/services';

@Injectable()
export class UpdateUserService {
    @Inject()
    private prisma: PrismaService;

    @Inject(Microservices.UPLOADER)
    private uploaderMicroservice: ClientProxy;

    @Inject(Microservices.AUTH)
    private authMicroservice: ClientProxy;

    @Inject()
    private uploadReceiver: UploadReceiverService;

    public async update(user: User, input: UpdateUserInput): Promise<UserObject> {
        const avatarId = await this.updateAvatar(input.avatar);

        const updated = await this.prisma.user.update({
            where: { id: user.id },

            data: {
                avatarId,
                email: input.email,
                username: input.username,
                password: input.password,
                emailStatus: input.email ? UserEmailStatus.UNVERIFIED : undefined,
            },
        });

        if (input.avatar) await this.removeOldAvatar(user.avatarId);
        if (input.email) await this.verifyEmail(updated);

        return updated;
    }

    private async updateAvatar(fileUpload: Promise<FileUpload>): Promise<string> {
        if (!fileUpload) return undefined;

        const request = await this.uploadReceiver.receiveFile(await fileUpload);
        return firstValueFrom<string>(this.uploaderMicroservice.send(UploaderCommand.UPLOAD_ILLUSTRATION, request));
    }

    private async removeOldAvatar(avatarId: string): Promise<void> {
        const defaultAvatar = await this.prisma.userDefaultAvatar.findUnique({
            where: { id: avatarId },
        });
        !defaultAvatar && await this.prisma.illustration.delete({
            where: { id: avatarId },
        });
    }

    private async verifyEmail(user: User): Promise<void> {
        await firstValueFrom(this.authMicroservice.send(AuthCommand.SEND_EMAIL_VERIFICATION, user));
    }
}
