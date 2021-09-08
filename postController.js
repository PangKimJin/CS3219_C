const Post = require('./postModel');

// GET /api/posts
exports.index = function(req, res) {
    res.send(Post.posts);
}

// POST /api/posts
exports.new = function(req, res) {
    if (!req.body.title  || !req.body.author || !req.body.category) {
        res.status(400).send('Error 400: Every post must have a title, author, and category');
        return;
    }
    if (req.body.title.length < 2  || req.body.author.length < 2 || req.body.category.length < 2) {
        res.status(400).send('Error 400: The post title, author, and category must each be longer than 1 character');
        return;
    }
    const newPost = {
        id: Post.posts.length + 1,
        title: req.body.title,
        author: req.body.author,
        category: req.body.category
    };
    Post.posts.push(newPost);
    res.send(newPost);
}

// GET /api/posts/:id
exports.view = function(req, res) {
    const post = Post.posts.find(p => p.id === parseInt(req.params.id));
    if (!post) {
        res.status(404).send('Error 404: Invalid GET request, no post with id ' + req.params.id + ' found');
    }
    res.send(post);
}

// PUT /api/posts/:id
exports.update = function(req, res) {
    // validate post id, if post id is invalid, return 404 error
    const post = Post.posts.find(p => p.id === parseInt(req.params.id));
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
}

exports.delete = function(req, res) {
    const postToDelete = Post.posts.find(p => p.id === parseInt(req.params.id));
    if (!postToDelete) {
        res.status(404).send('Error 404: Invalid DELETE request, no post with id ' + req.params.id + ' found');
    }
    const deletedIndex = Post.posts.indexOf(postToDelete);
    Post.posts.splice(deletedIndex, 1);
    res.send(postToDelete);
}
