const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Tag {
    id: ID!
    name: String!
  }
  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }
  type Post {
    id: ID!
    title: String!
    content: String!
    user: User!
    tags: [Tag!]
  }
	type User {
		fullName: String
		email: String
		password: String
		googleId: String
		picture: String
    posts: [Post]
	}
  
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    books: [Book]
		users: [User]
    user: User
    posts: [Post]
  }
  input PostInput{
    title: String!
    content: String!
    userId: Int!
    tags: [Int!]
  }
  type Mutation {
    createPost(postInput: PostInput): Post!
    createTag(name:String!): Tag!
  }
`;

module.exports =  typeDefs;