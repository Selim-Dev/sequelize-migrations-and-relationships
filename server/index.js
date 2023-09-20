const express = require("express");
const cors = require('cors');
const passport = require('passport');
const cookieSession = require('cookie-session')
const { ApolloServer } = require("apollo-server-express");
const resolvers = require("./graphql/resolvers.js");
const typeDefs = require("./graphql/typeDefs.js");
require('dotenv').config();
const db = require('./models')
const app = express();
let apolloServer = null;
const api = require('./api');

// passport middlewares
require('./auth/passport')
require('./auth/passportGoogleSSo') 

// initialize sequelize 
db.sequelize.authenticate({force: false}).then(() => {
  console.log('connected to db');
});


const allowedOrigins = [
  'http://localhost:3000',
  'https://studio.apollographql.com'
]
const corsOptions = {
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not ' +
                  'allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}
app.use(cors(corsOptions))



app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// cookie session
app.use(cookieSession({
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.COOKIE_KEY]
}))

// calling passport initialization
app.use(passport.initialize())
app.use(passport.session())


app.use('/api/v1', api);

async function startServer() {
    apolloServer = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({ req, res }) => {
            return {user: req?.user}
        },
    });
    await apolloServer.start();
    apolloServer.applyMiddleware({ app,cors: corsOptions });
}
startServer();


const port = process.env.PORT ? +process.env.PORT : 5000;
app.listen(port, () => {
  console.log(`🚀 Server ready at http://localhost:5000`);
});
