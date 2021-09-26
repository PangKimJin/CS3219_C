const path = require('path');
const express = require('express');
const app = express();
const publicPath = path.join(__dirname, 'web/src');

app.use(express.static(publicPath));
app.use(express.urlencoded({extended: true})); 
// app.use(express.json());

let apiRoutes = require("./api-routes");

app.get('/', (req, res) => {
    res.sendFile(path.join(publicPath, 'App.js'));
});

app.get('/hello', (req, res) => {
    res.send('hello world');
});

app.post("/new", async(req, res) => {
    console.log(req )
    let obj = req.body;
    res.send(obj);
})

app.use('/api', apiRoutes);

const port = process.env.PORT || 3001;
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log('App listening at http://%s:%s', host, port);
  });
module.exports = server