import { IllustrationStatus } from '../client';
import { prisma } from './client-provider';

export async function seedAvatars(): Promise<void> {
    const indexes = new Array(10).fill(0);

    await prisma.$transaction(indexes.map((_, index) => {
        const filename = `avatar-${index}.jpg`;

        return prisma.userDefaultAvatar.create({
            data: {
                index,
                illustration: {
                    create: {
                        alias: `default-avatars/${filename}`,
                        originalWidth: 400,
                        originalHeight: 400,
                        status: IllustrationStatus.UPLOADED,
                        filename,
                    },
                },
            },
        });
    }));
}
