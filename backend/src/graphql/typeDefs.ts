import { gql } from 'apollo-server-express';

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Event {
    id: ID!
    name: String!
    location: String!
    startTime: String!
    attendees: [User!]!
  }

  type Query {
    events: [Event!]!
    me: User
  }

  type Mutation {
  login(email: String!, password: String!): AuthPayload!
  joinEvent(eventId: ID!): Event
}

type AuthPayload {
  token: String!
  user: User!
}
`;

export default typeDefs;
