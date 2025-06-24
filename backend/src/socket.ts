import { Server } from 'socket.io';

export let io: Server;

const setupSocket = (server: any) => {
    io = new Server(server, {
        cors: { origin: '*' },
    });

    io.on('connection', (socket) => {
        socket.on('joinEvent', ({ eventId, user }) => {
            socket.join(eventId);
    
            io.to(eventId).emit('user_joined', user);
            console.log(`${user.name} joined event ${eventId}`);
        });

        socket.on('leaveRoom', ({ eventId, user }) => {
            socket.leave(eventId);
            io.to(eventId).emit('user_left', user);
        });
    });

};
export default setupSocket;