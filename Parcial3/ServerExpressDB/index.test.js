const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('prueba al modulo.js', () => { 
    it('fails, as expected', function(done) { // <= Pass in done callback
        chai.request('http://localhost:3000')
        .get('/usuario')
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();                               // <= Call done to signal callback end
        });
      });
})