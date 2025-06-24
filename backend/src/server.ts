import express from 'express';
import http from 'http';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from "./graphql/typeDefs";
import resolvers from "./graphql/resolvers";
import context from "./context";
import setupSocket from "./socket";
import type { Express } from 'express';
import jwt from 'jsonwebtoken';


console.log("typeDefs:", !!typeDefs); // should log: true
console.log("resolvers:", !!resolvers); // should log: true

const app = express();
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello world");
});

const httpServer = http.createServer(app);

async function start() {
    console.log("Loaded typeDefs:", typeDefs);
    const server = new ApolloServer({ typeDefs, resolvers, context: ({ req }) => {
        const auth = req.headers.authorization || '';
        const token = auth.replace('Bearer ', '');
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET!) as jwt.JwtPayload;
            return { user: { id: decoded.userId } };
        } catch {
            return {};
        }
        }, });
    await server.start();

    server.applyMiddleware({app: app as any });

    setupSocket(httpServer);

    httpServer.listen(5000, () => {
        console.log(`🚀 Server ready at http://localhost:5000${server.graphqlPath}`);
    });
}

start();
