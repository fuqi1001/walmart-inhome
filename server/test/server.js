import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../server';

chai.use(chaiHttp)
chai.should();

describe("Test hello", () => {
  describe("GET /api/hello", () => {
    it("should return hello", (done) => {
      chai.request(app)
          .get('/api/hello')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            done();
          })
    });
  })
})

