const express = require('express');
const app = express();

app.use(express.json());

const posts = [
    { id: 1, title: 'My First Blog Post', author: "Kim Jin", category: "Misc"},
    { id: 2, title: 'Learning to Code', author: "Kim Jin", category: "Programming"},
    { id: 3, title: 'Debugging for the First Time', author: "Kim Jin", category: "Programming"}
]

app.get('/', (req, res) => {
    res.send('hello world');
});

app.get('/api/posts', (req, res) => {
    res.send(posts);
});

app.get('/api/posts/:id', (req, res) => {
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
        res.status(404).send('Error 404: Invalid GET request, no post with id ' + req.params.id + ' found');
    }
    res.send(post);
});

app.post('/api/posts/', (req, res) => {
    if (!req.body.title  || !req.body.author || !req.body.category) {
        res.status(400).send('Error 400: Every post must have a title, author, and category');
        return;
    }
    if (req.body.title.length < 2  || req.body.author.length < 2 || req.body.category.length < 2) {
        res.status(400).send('Error 400: The post title, author, and category must each be longer than 1 character');
        return;
    }
    const newPost = {
        id: posts.length + 1,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category
    };
    posts.push(newPost);
    res.send(newPost);
});

app.put('/api/posts/:id', (req, res) => {
    // validate post id, if post id is invalid, return 404 error
    const post = posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
        res.status(404).send('Error 404: Invalid PUT request, no post with id ' + req.params.id + ' found');
    }

    // validate PUT request body, if invalid, return 400 error
    if (!req.body.title  || !req.body.author || !req.body.category) {
        res.status(400).send('Error 400: Every update request must have a title, author, and category');
        return;
    }
    if (req.body.title.length < 2  || req.body.author.length < 2 || req.body.category.length < 2) {
        res.status(400).send('Error 400: The post title, author, and category must each be longer than 1 character');
        return;
    }

    // update post
    post.title = req.body.title;
    post.author = req.body.author;
    post.category = req.body.category;
    res.send(post);
});

app.delete('/api/posts/:id', (req, res) => {
    const postToDelete = posts.find(p => p.id === parseInt(req.params.id));
    if (!postToDelete) {
        res.status(404).send('Error 404: Invalid DELETE request, no post with id ' + req.params.id + ' found');
    }
    const deletedIndex = posts.indexOf(postToDelete);
    posts.splice(deletedIndex, 1);
    res.send(postToDelete);
});

const port = process.env.PORT || 3000;
var server = app.listen(port, function () {
    var host = server.address().address;
    var port = server.address().port;
  
    console.log('App listening at http://%s:%s', host, port);
  });
module.exports = server