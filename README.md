# Apollo-GraphQL

# 🚀 Apollo GraphQL Server with TypeScript

This is a simple **Apollo Server** built with **GraphQL and TypeScript**. It includes:
- A **user management API** with queries and mutations.
- **Dynamic user fetching** by ID and listing all users.
- **Batch user creation** (adding multiple users at once).

---

## 📌 Features
- **GraphQL Queries**
  - `hello`: Returns a welcome message.
  - `user(id: ID!)`: Fetches a user by ID.
  - `users`: Returns a list of all users.

- **GraphQL Mutations**
  - `addUsers(users: [UserInput!]!)`: Adds multiple users and returns the updated list.
