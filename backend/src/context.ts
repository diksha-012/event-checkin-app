
const mockToken = "mocktoken";

export interface User {
    id: string;
    name: string;
    email: string;
}

export interface ContextType {
    user: User | null;
}

const context = ({ req }: any): ContextType => {
    const token = req.headers.authorization || '';
    if (token === `Bearer ${mockToken}`) {
        return {
            user: { id: "demo-user", name: "Alice", email: "alice@example.com" },
        };
    }
    return { user: null };
};
export default context;