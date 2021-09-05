// const assert = require('chai').assert;
// const app = require('../index');

// describe('App', function(){
//     it('should return hello world', function(){
//         assert.equal(app, 'hello world');
//     })
// })


let app = require('../index');
//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let should = chai.should();
const assert = require('chai').assert;


chai.use(chaiHttp);
describe("GET /", () => {
    // test that it is able to connect and grab all ingredient list (if any)
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
})