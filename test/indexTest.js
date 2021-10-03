let app = require('../index');

let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const assert = require('chai').assert;

chai.use(chaiHttp);

// GET Tests
describe("/GET", () => {
    it("should get hello world", (done) => {
        chai.request(app)
            .get("/")
            .end((err, res) => {
                res.should.have.status(200);
                res.text.should.be.a('string');
                assert.equal("hello world", res.text);
                done();
            });
    });
    it("should get all posts", (done) => {
        chai.request(app)
            .get("/api/posts")
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an.instanceof(Array)
                assert.equal(3, res.body.length);
                done();
            });
    });
    it("should throw error if GET request URL does not exist", (done) => {
        chai.request(app)
            .get("/doesnotexist")
            .end((err, res) => {
                res.should.have.status(404);
                res.text.should.be.a('string');
                assert.equal("Error 404: Page not found, please enter a valid URL", res.text);
                done();
            });
    });
});

// POST Tests
describe("/POST", () => {
    it("should POST a new post", (done) => {
        let newPost = {
            title: 'Taking a Break', author: "Kim Jin", category: "Misc"
        }
        chai.request(app)
            .post("/api/posts")
            .send(newPost)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                assert.equal(4, res.body.id);
                assert.equal("Taking a Break", res.body.title);
                assert.equal("Kim Jin", res.body.author);
                assert.equal("Misc", res.body.category);
                done();
            });
    });

    it("should not POST a new post if title is empty", (done) => {
        let newPost = {
            title: '', author: "Kim Jin", category: "Misc"
        }
        chai.request(app)
            .post("/api/posts")
            .send(newPost)
            .end((err, res) => {
                res.should.have.status(400);
                assert.equal("Error 400: Every post must have a title, author, and category", res.text);
                done();
            });
    });

    it("should not POST a new post if author is only 1 character long", (done) => {
        let newPost = {
            title: 'Taking a Break', author: "K", category: "Misc"
        }
        chai.request(app)
            .post("/api/posts")
            .send(newPost)
            .end((err, res) => {
                res.should.have.status(400);
                assert.equal("Error 400: The post title, author, and category must each be longer than 1 character", res.text);
                done();
            });
    });
});

// PUT Tests
describe("/PUT/:id", () => {
    it("should update post with the specified id", (done) => {
        let putRequest = {
            title: 'Taking a Break', author: "Kim Jin", category: "Misc"
        }
        chai.request(app)
            .put("/api/posts/3")
            .send(putRequest)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                assert.equal(3, res.body.id);
                assert.equal("Taking a Break", res.body.title);
                assert.equal("Kim Jin", res.body.author);
                assert.equal("Misc", res.body.category);
                done();
            });
    });

    it("should not update post if information is missing", (done) => {
        let putRequest = {
            title: 'Taking a Break', author: "Kim Jin"
        }
        chai.request(app)
            .put("/api/posts/3")
            .send(putRequest)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                assert.equal("Error 400: Every update request must have a title, author, and category", res.text);
                done();
            });
    });

    it("should not update post if information is too short", (done) => {
        let putRequest = {
            title: 'Taking a Break', author: "K", category: "Misc"
        }
        chai.request(app)
            .put("/api/posts/3")
            .send(putRequest)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.should.be.a('object');
                assert.equal("Error 400: The post title, author, and category must each be longer than 1 character", res.text);
                done();
            });
    });
});

// DELETE Test
describe('/DELETE/:id', () => {
    it('should DELETE a post of the specified id', (done) => {
        chai.request(app)
            .delete("/api/posts/2")
            .send()
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                assert.equal("Learning to Code", res.body.title);
                done();
            });
    })

    it('should not DELETE any post if id is invalid', (done) => {
        chai.request(app)
            .delete("/api/posts/7")
            .send()
            .end((err, res) => {
                res.should.have.status(404);
                res.body.should.be.a('object');
                assert.equal('Error 404: Invalid DELETE request, no post with id 7 found', res.text);
                done();
            });
    })
})
