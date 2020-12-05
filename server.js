const express = require('express');
const bodyParser = require('body-parser');

// create express app
const app = express();

// Setup server port
const port = process.env.PORT || 5000;

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse requests of content-type - application/json
app.use(bodyParser.json())

// define a root route
app.get('/', (req, res) => {
  res.send("Hello World");
});

// Require user routes
const userRoutes = require('./src/routes/user.routes')
const accessoireRoutes = require('./src/routes/accessoire.routes')
const billetRoutes = require('./src/routes/billet.routes')
const matchRoutes = require('./src/routes/match.routes')
const storeRoutes = require('./src/routes/store.routes')

// using as middleware
app.use('/user', userRoutes)
app.use('/accessoire', accessoireRoutes)
app.use('/billet', billetRoutes)
app.use('/match', matchRoutes)
app.use('/store', storeRoutes)



// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});