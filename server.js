const express =require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
require("dotenv").config({path: "variables.env" });

//Importing the schema
const Homeless = require('./models/Homeless');
const Donar = require('./models/Donor');
const Shelter = require('./models/Shelter');
const ServiceCenter = require('./models/ServiceCenter');

//TO allow cross-domain request that is from React-Fontend to GraphQL backend
const cors = require('cors');

//Connect to database
mongoose.connect(process.env.MONGO_URI)
      .then(()=>{
      console.log('DB Connected');
    }).catch((err)=>{
      console.log(err);
    })

//GraphQL Middleware
const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');
const { makeExecutableSchema } = require('graphql-tools');
//const { ApolloServer, gql } = require('apollo-server-express');

const { typeDefs } = require('./Schema.js');
const { resolvers } = require('./Resolvers.js')

// const startServer = async () =>{
//   const server = new ApolloServer({
//     typeDefs,
//     resolvers
//
//   })
// }
// const app = express();
//
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//    saveUninitialized: false,
//   })
// )
//
// server.applyMiddleware({ app });
// app.listen({ port: 4000 }, () =>
//   console.log(` Server ready at http://localhost:4000${server.graphqlPath}`)
// )
//
// startServer();

//Create schema
const schema = makeExecutableSchema({
    typeDefs: typeDefs,
    resolvers: resolvers
})

//initiate the application
const app = express();

const corsOptions = {
  origin:   'http://localhost:3000',
  credentials: true
}
app.use(cors(corsOptions));

// Create express session
app.use(
  session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
  })
)
//Connect MongoDB schema with GraphQL
app.use(
  '/graphql',
  bodyParser.json(),
  (req, _, next)=> {
    console.log(req.session);
    return next();
  },
  graphqlExpress( req => ({
      schema,
      context: {
          Homeless,
          Donar,
          Shelter,
          ServiceCenter,
          req
      }
  })
)
);


//Create graphiql application
app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql'}
))

const PORT = process.env.PORT || 4444

app.listen(PORT, ()=>{
  console.log(`Server listening on PORT ${PORT}`);
});
