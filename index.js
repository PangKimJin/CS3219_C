require('dotenv').config();
const path = require('path');
const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');

app.use(express.urlencoded({extended: true})); 
app.use(express.json());

let apiRoutes = require("./api-routes");


app.get('/', (req, res) => {
  res.send('hello world');
});

app.post('/login', (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  // serialize user
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET)
  res.json({ accessToken: accessToken });
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  // no token, unauthenticated
  if (token == null) return res.sendStatus(401);
  // has token
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    // not a valid token
    if (err) return res.sendStatus(403);
    // valid token
    req.user = user;
    next();
  })
}

app.get('/404', function(req, res, next){
  // trigger a 404 since no other middleware
  // will match /404 after this one, and we're not
  // responding here
  next();
});


app.use('/api', authenticateToken, apiRoutes);
app.use(function(req, res, next){
  res.status(404);

  res.format({
    default: function () {
      res.type('txt').send('Error 404: Page not found, please enter a valid URL')
    }
  })
});

const port = process.env.PORT || 3001;
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log('App listening at http://%s:%s', host, port);
  });
module.exports = server