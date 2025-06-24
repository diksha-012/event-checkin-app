import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function seed() {
    await prisma.event.createMany({
        data: [
            {
            id: '1',
            name: 'ReactConf',
            location: 'San Francisco',
            startTime: new Date('2025-07-01T10:00:00Z'),
            },
            {
                id: '2',
                name: 'GraphQLConf',
                location: 'New York',
                startTime: new Date('2025-08-15T09:00:00Z'),
            },
        ],
    });

}

seed().then(() => {
    console.log('Seeded');
    prisma.$disconnect();
});
