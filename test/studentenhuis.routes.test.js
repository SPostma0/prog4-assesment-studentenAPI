const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let validToken;
chai.request('localhost:3000')
    .post('/api/public/login')
    .send({
    "Email": "Jack@box.nl",
    "Wachtwoord": "Wachtwoord"
})
    .end((err, res) => {

    validToken = res.body.token;
    });

let deleteID;

describe('Studentenhuis POST', () => {
    it('Throw error on invalid token', (done) => {
        chai.request(server)
            .post('/Routes/SecuredRoutes/Studenthuis')
            .set('x-access-token', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                done()
            });
    });

    it('Should return studenthuis on succes', (done) => {
        chai.request(server)
            .post('/Routes/SecuredRoutes/Studenthuis')
            .set('x-access-token', validToken)
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                const response = res.body.result[0];
                response.should.have.property('id');
                response.should.have.property('naam').and.equals("string");
                response.should.have.property('adres').and.equals("help");
                response.should.have.property('contact');
                response.should.have.property('email');
                deleteID = res.body.result.id;

                done()
            });
    });

    it('Throw error on missing name', (done) => {
        chai.request(server)
            .post('/Routes/SecuredRoutes/Studenthuis')
            .send({
                "adres": "help"
            })
            .set('x-access-token', validToken)
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    });

    it('Throw error on missing adress', (done) => {
        chai.request(server)
            .post('/Routes/SecuredRoutes/Studenthuis')
            .set('x-access-token', validToken)
            .send({
                "naam": "help"
            })
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    })
});

describe('Studentenhuis GET all', () => {
    it('Throw error on invalid token', (done) => {
        chai.request(server)
            .get('/Routes/SecuredRoutes/Studenthuis')
            .set('x-access-token', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .end((err, res) => {
                done()
            });
    });

    it('Return all studenthuis, on valid token', (done) => {
        chai.request(server)
            .get('/Routes/SecuredRoutes/Studenthuis')
            .set('x-access-token', validToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done()
            });
    })
});

describe('Studentenhuis GET one', () => {
    it('Throw error on invalid token', (done) => {
        chai.request(server)
            .get('/Routes/SecuredRoutes/Studenthuis')
            .set('x-access-token', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .end((err, res) => {
                done()
            });
    });

    it('Return studenthuis on existing ID', (done) => {
        chai.request(server)
            .get('/Routes/SecuredRoutes/Studenthuis/1')
            .set('x-access-token', validToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.result[0].should.have.property("id").and.equal(1);
                done()
            });

    });

    it('Throw error on non-existing ID', (done) => {
        chai.request(server)
            .get('/Routes/SecuredRoutes/Studenthuis/600000')
            .set('x-access-token', validToken)
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    })
});

describe('Studentenhuis PUT', () => {
    it('Throw error on invalid token', (done) => {
        chai.request(server)
            .put('/Routes/SecuredRoutes/Studenthuis')
            .set('x-access-token', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                done()
            });
    });

    it('Return object on valid studenthuis', (done) => {
        chai.request(server)
            .put('/Routes/SecuredRoutes/Studenthuis1')
            .set('x-access-token', validToken)
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

                const response = res.body.result[0];
                response.should.have.property('id');
                response.should.have.property('naam').and.equals("string");
                response.should.have.property('adres').and.equals("help");
                response.should.have.property('contact');
                response.should.have.property('email');

                done()
            });
    });

    it('Throw error on missing name', (done) => {
        chai.request(server)
            .put('/Routes/SecuredRoutes/Studenthuis/1')
            .set('x-access-token', validToken)
            .send({
                "adres": "help"
            })
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    });

    it('Throw error on missing adress', (done) => {
        chai.request(server)
            .put('/Routes/SecuredRoutes/Studenthuis/1')
            .set('x-access-token', validToken)
            .send({
                "naam": "string"
            })
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    })
});

describe('Studentenhuis DELETE', () => {
    it('Throw error on invalid token', (done) => {
        chai.request(server)
            .delete('/Routes/SecuredRoutes/Studenthuis')
            .set('x-access-token', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                done()
            });
    });

    it('Delete studenthuis', (done) => {
        chai.request(server)
            .delete('/api/studentenhuis/' + deleteID)
            .set('x-access-token', validToken)
            .end((err, res) => {
                res.should.have.status(200);

                done()
            });
    });

});