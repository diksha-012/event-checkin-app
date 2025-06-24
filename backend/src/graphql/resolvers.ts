import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const resolvers = {
    Query: {
        events: async () => {
            const events = await prisma.event.findMany();
            return events || [];
        },

        me: async (_: any, __: any, context: any) => {
            if (!context.user) return null;
            return prisma.user.findUnique({
                where: { id: context.user.id }
            });
        }
    },
    Mutation: {
        login: async (_: any, { email, password }: any) => {
            if (!email) {
                throw new Error("Username is required");
            }

    
            let user = await prisma.user.findUnique({
                where: { email },
            });

            if (!user) {
                user = await prisma.user.create({
                    data: { name: email.split('@')[0] || email, email },
                });
            }

            const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET!);

            return {
                token,
                user,
            };
        },


        joinEvent: async (_: any, { eventId }: any, context: any) => {
            const user = context.user;
            console.log("Joining user:", user);
            if (!user) throw new Error("Not authenticated");

            await prisma.event.update({
                where: { id: eventId },
                data: {
                    attendees: { connect: { id: user.id } },
                },
            });

            return prisma.event.findUnique({
                where: { id: eventId },
                include: { attendees: true },
            });
        },
    },
};

export default resolvers;
