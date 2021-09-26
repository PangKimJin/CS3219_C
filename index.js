const express = require('express');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
app.use(express.json());

let apiRoutes = require("./api-routes");

app.get('/', (req, res) => {
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