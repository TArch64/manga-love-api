import { prisma } from './client-provider';
import { seedCategories } from './seed-categories';

(async (): Promise<void> => {
    await seedCategories();
})()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => prisma.$disconnect());
