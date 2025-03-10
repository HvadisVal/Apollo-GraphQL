import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import gql from "graphql-tag";


interface User {
  id: string;
  name: string;
  age: number;
}

interface QueryArgs {
  id: string;
}

// Sample users data
const users = [
  { id: "1", name: "Alice", age: 25 },
  { id: "2", name: "Bob", age: 30 },
  { id: "3", name: "Charlie", age: 22 }
];

// Define GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    age: Int!
  }

  type Query {
    hello: String
    user(id: ID!): User
    users: [User!]!
  }

  type Mutation {
  addUser(id: ID!, name: String!, age: Int!): [User!]!
}
`;

// Define resolvers (Now it's above ApolloServer)
const resolvers = {
  Query: {
    hello: (): string => "Hello, Apollo Server with TypeScript!",

    // Define `_parent` as `unknown` and `args` with the `QueryArgs` interface
    user: (_parent: unknown, args: QueryArgs): User | null => {
      return users.find(user => user.id === args.id) || null;
    },
      users: (): User[] => {
        return users;  // Return all users
      }
  },

  Mutation: {
    addUser: (_parent: unknown, args: User): User[] => {
      console.log("Received args:", args);  // Debugging log
  
      if (!args.id) {
        throw new Error("ID is required but not provided!");
      }
  
      const newUser: User = { id: args.id, name: args.name, age: args.age };
      users.push(newUser);
  
      console.log("Added user:", newUser);  // Debugging log
  
      return users;  // Return all users instead of just the new one
    }
  }    
};

// Create Apollo Server instance
const server = new ApolloServer({
  typeDefs,
  resolvers, // This now correctly refers to the defined resolvers
});

// Start the server
const startServer = async () => {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });

  console.log(`🚀 Apollo Server ready at ${url}`);
};

// Run the server
startServer().catch((err) => console.error("Server error:", err));
