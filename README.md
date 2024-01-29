# graphql-basic-example
This is for graphql with basic examples - Made by Ho Zhi Hao

# Installation Steps: 
***Step 1:***

npm install @apollo/server graphql -> to install for apollo server and graphQL
npm install mongoose mongodb -> Set up mongodb packages and mongoose

# Creating a simple project with Apollo Server
***Step 1:***

Create a new project: 
1. mkdir graphql-server-example
2. cd graphql-server-example

Intialize a new Node.js project with npm:
1. npm init --yes && npm pkg set type="module"

***Step 2:***

Install dependencies:
1. npm install @apollo/server graphql
   
Create a src directory with index.ts file to contain all of the code:
3. mkdir src
4. touch src/index.ts or just open the file from vsc
   
Run the following command to install the typescript and @types/node packages into the project's dev dependencies
5. npm install --save-dev typescript @types/node

Create a tsconfig.json file and add the following configuration to the file:
6. touch tsconfig.json
7. Configurations: 
  {
    "compilerOptions": {
      "rootDirs": ["src"],
      "outDir": "dist",
      "lib": ["es2020"],
      "target": "es2020",
      "module": "esnext",
      "moduleResolution": "node",
      "esModuleInterop": true,
      "types": ["node"]
    }
  }

Replace the default scripts entry in package.json file with the following entries:
1. Configuration Entries:
  {
    // ...etc.
    "type": "module",
    "scripts": {
      "compile": "tsc",
      "start": "npm run compile && node ./dist/index.js"
    }
    // other dependencies
  }

***Step 3:***
   
Defining Schema, Dataset, and resolver
1. Import the following packages/modules:
  import { ApolloServer } from '@apollo/server';
  import { startStandaloneServer } from '@apollo/server/standalone';
  import mongoose from 'mongoose';

3. Define your schema and models
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
        } else {
          const newAuthor = new Author({ name: name });
          await newAuthor.save();
          return newAuthor;
        }
      },
      
      deleteAuthor: async (_, { name }) => {
        const deletedAuthor = await Author.findOneAndDelete({ name: name });
        if (deletedAuthor) {
          return `The author "${name}" has been deleted`;
        } else {
          throw new Error(`The author "${name}" was not found`);
        }
      },
      
      editAuthorName: async (_, { currentName, newName }) => {
        const author = await Author.findOne({ name: currentName });
        if (!author) {
          throw new Error(`The Author "${currentName}" was not found`);
        } else {
          author.name = newName;
          await author.save();
          return author;
        }
      },
    },
  };

***Step 4***

Create an instance of ApolloServer
// Create an Apollo Server instance
const server = new ApolloServer<any>({ typeDefs, resolvers });

// Start the server
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);

