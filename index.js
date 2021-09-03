const express = require('express');
const app = express();

app.use(express.json());

const posts = [
    { id: 1, name: 'post1'},
    { id: 2, name: 'post2'},
    { id: 3, name: 'post3'}
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
    if (!req.body.name) {
        res.status(400).send('Error 400: Please include a name');
        return;
    }
    const newPost = {
        id: posts.length + 1,
        name: req.body.name
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
    if (!req.body.name) {
        res.status(400).send('Error 400: Please include a name');
        return;
    }

    // update post
    post.name = req.body.name;
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
app.listen(port, () => console.log(`Listening on port ${port}...`));