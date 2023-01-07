import { prisma } from './client-provider';
import { seedCategories } from './seed-categories';
import { seedAvatars } from './seed-avatars';

const seeds = [
    seedCategories,
    seedAvatars,
];

(async (): Promise<void> => {
    for (const seed of seeds) {
        console.log(`Executing ${seed.name}`);
        await seed();
    }
})()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
