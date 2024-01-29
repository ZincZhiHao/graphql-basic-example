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
   
![image](https://github.com/ZincZhiHao/graphql-basic-example/assets/146707942/f21bb922-5821-44cf-86cb-e8092f19b650)


Replace the default scripts entry in package.json file with the following entries:
1. Configuration Entries:

  ![image](https://github.com/ZincZhiHao/graphql-basic-example/assets/146707942/305e7e28-60db-4d8d-ab72-f02861876255)


***Step 3:***
   
Defining Schema, Dataset, and resolver
1. Import the following packages/modules:

![image](https://github.com/ZincZhiHao/graphql-basic-example/assets/146707942/d42d5cfd-dbde-4984-87db-4546c82fa390)


2. Define your schema and models
   
  // MongoDB connection

![image](https://github.com/ZincZhiHao/graphql-basic-example/assets/146707942/74757d69-5692-4771-9b3f-e8ee6bb7a481)

  
  // Define Mongoose schemas and models
  
![image](https://github.com/ZincZhiHao/graphql-basic-example/assets/146707942/e5936e67-f4cf-4b1e-a84c-a3fe535a7d79)

  
  // GraphQL type definitions
  
![image](https://github.com/ZincZhiHao/graphql-basic-example/assets/146707942/de8951ad-e26b-4297-ab42-7284fc3a3481)

  
  // GraphQL resolvers
  
![image](https://github.com/ZincZhiHao/graphql-basic-example/assets/146707942/b15d47c0-7396-435b-88ef-0f6afd2f8a20)


***Step 4***

Create an instance of ApolloServer

![image](https://github.com/ZincZhiHao/graphql-basic-example/assets/146707942/6d56acae-0a6a-483e-b2b6-60bb2abb51bb)

