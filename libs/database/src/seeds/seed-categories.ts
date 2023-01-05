import { prisma } from './client-provider';
import data from './seed-categories-data.json';

export async function seedCategories(): Promise<void> {
    await prisma.workCategory.createMany({ data });
}
