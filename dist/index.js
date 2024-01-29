import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
// Load environment variables from .env file
dotenv.config();
// MongoDB connection
mongoose.connect("mongodb+srv://admin:admin@graphql.4oadkqc.mongodb.net/");
// Define Mongoose schemas and models
const { Schema } = mongoose;
const authorSchema = new Schema({
    name: String,
});
const Author = mongoose.model('Author', authorSchema);
const bookSchema = new Schema({
    title: String,
    author: { type: Schema.Types.ObjectId, ref: 'Author' },
});
const Book = mongoose.model('Book', bookSchema);
// GraphQL type definitions
const typeDefs = `
  type Book {
    title: String
    author: Author
  }

  type Author {
    name: String
  }

  type Query {
    books: [Book]
    authors: [Author]
  }
  
  type Mutation {
    createAuthor(name: String!): Author
    createBook(title: String!, authorName: String!): Book
    deleteBook(title: String!): String
    deleteAuthor(name: String!): String
    editBookTitle(currentTitle: String!, newTitle: String!): Book
    editAuthorName(currentName: String!, newName: String!): Author
  }
  
  
`;
// GraphQL resolvers
const resolvers = {
    Query: {
        books: async () => {
            return await Book.find().populate('author');
        },
        authors: async () => {
            return await Author.find().populate('name');
        },
    },
    Mutation: {
        createAuthor: async (_, { name }) => {
            // Check for duplicate author
            const existingAuthor = await Author.findOne({ name: name });
            if (existingAuthor) {
                throw new Error('An author with the same name already exists');
            }
            else {
                const newAuthor = new Author({ name: name });
                await newAuthor.save();
                return newAuthor;
            }
        },
        createBook: async (_, { title, authorName }) => {
            // Check for duplicate book title
            const existingBook = await Book.findOne({ title: title });
            if (existingBook) {
                throw new Error('A book with the same title already exists');
            }
            else {
                // Check for existing author or create a new one
                let author = await Author.findOne({ name: authorName });
                if (!author) {
                    author = new Author({ name: authorName });
                    await author.save();
                }
                // Create and save the new book
                const newBook = new Book({ title, author: author._id });
                await newBook.save();
                return newBook;
            }
        },
        deleteBook: async (_, { title }) => {
            const deletedBook = await Book.findOneAndDelete({ title: title });
            if (deletedBook) {
                return `The book "${title}" has been deleted`;
            }
            else {
                throw new Error(`The book "${title}" was not found`);
            }
        },
        deleteAuthor: async (_, { name }) => {
            const deletedAuthor = await Author.findOneAndDelete({ name: name });
            if (deletedAuthor) {
                return `The author "${name}" has been deleted`;
            }
            else {
                throw new Error(`The author "${name}" was not found`);
            }
        },
        editBookTitle: async (_, { currentTitle, newTitle }) => {
            const book = await Book.findOne({ title: currentTitle });
            if (!book) {
                throw new Error(`The book "${currentTitle}" was not found`);
            }
            else {
                book.title = newTitle;
                await book.save();
                return book;
            }
        },
        editAuthorName: async (_, { currentName, newName }) => {
            const author = await Author.findOne({ name: currentName });
            if (!author) {
                throw new Error(`The Author "${currentName}" was not found`);
            }
            else {
                author.name = newName;
                await author.save();
                return author;
            }
        },
    },
};
// Create an Apollo Server instance
const server = new ApolloServer({ typeDefs, resolvers });
// Start the server
const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
});
console.log(`🚀  Server ready at: ${url}`);
