const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let validToken;
chai.request('localhost:3000')
    .post('/api/public/login')
    .send({
    "Email": "jsmit@server.nl",
    "Wachtwoord": "Wachtwoord"
})
    .end((err, res) => {


    validToken = 'Bearer ' + res.body.token;
    });

let deleteID;

describe('Studentenhuis POST', () => {
    it('Throw error on invalid token', (done) => {
        chai.request('localhost:3000')
            .post('/api/protected/studentenhuis/')
            .set('Authorization', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .send({
                "Naam": "string",
                "Adres": "help"
            })
            .end((err, res) => {
                done()
            });
    });

    it('Should return studenthuis on posting valid object', (done) => {
        chai.request('localhost:3000')
            .post('/api/protected/studentenhuis/')
            .set('Authorization', validToken)
            .send({
                "Naam": "string",
                "Adres": "help"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

              
                res.body.should.have.property('id');
                res.body.should.have.property('naam').and.equals("string");
                res.body.should.have.property('adres').and.equals("help");
                res.body.should.have.property('contact');
                res.body.should.have.property('email');
                deleteID = res.body.id;

                done()
            });
    });

    it('Throw error on missing name', (done) => {
        chai.request('localhost:3000')
            .post('/api/protected/studentenhuis/')
            .send({
                "adres": "help"
            })
            .set('Authorization', validToken)
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    });

    it('Throw error on missing adress', (done) => {
        chai.request('localhost:3000')
            .post('/api/protected/studentenhuis/')
            .set('Authorization', validToken)
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
        chai.request('localhost:3000')
            .get('/api/protected/studentenhuis/')
            .set('Authorization', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .end((err, res) => {
                done()
            });
    });

    it('Return all studenthuis, on valid token', (done) => {
        chai.request('localhost:3000')
            .get('/api/protected/studentenhuis/')
            .set('Authorization', validToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done()
            });
    })
});

describe('Studentenhuis GET one', () => {
    it('Throw error on invalid token', (done) => {
        chai.request('localhost:3000')
            .get('/api/protected/studentenhuis/')
            .set('Authorization', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .end((err, res) => {
                done()
            });
    });

    it('Return studenthuis on existing ID', (done) => {
        chai.request('localhost:3000')
            .get('/api/protected/studentenhuis/1')
            .set('Authorization', validToken)
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property("UserID").and.equal(1);
                done()
            });

    });

    it('Throw error on non-existing ID', (done) => {
        chai.request('localhost:3000')
            .get('/api/protected/studentenhuis/600000')
            .set('Authorization', validToken)
            .end((err, res) => {
                res.should.have.status(404);
                done()
            });
    })
});

describe('Studentenhuis PUT', () => {
    it('Throw error on invalid token', (done) => {
        chai.request('localhost:3000')
            .put('/api/protected/studentenhuis')
            .set('Authorization', "eyJAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MjcxNzYwMjUsImlhdCI6MTUyNjMxMjAyNX0.EQzuGFndkcLuBj7JQ1JNubmSPpmlE-YwTTpCW5rQgDQ")
            .send({
                "naam": "string",
                "adres": "help"
            })
            .end((err, res) => {
                done()
            });
    });

    it('Return object on valid studenthuis', (done) => {
        chai.request('localhost:3000')
            .put('/api/protected/studentenhuis/1')
            .set('Authorization', validToken)
            .send({
                "Naam": "string",
                "Adres": "help"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');

              //  const response = res.body.result[0];
                res.body.should.have.property('ID');
                res.body.should.have.property('naam');
                res.body.should.have.property('adres');
                res.body.should.have.property('contact');
                res.body.should.have.property('email');

                done()
            });
    });

    it('Throw error on missing name', (done) => {
        chai.request('localhost:3000')
            .put('/api/protected/studentenhuis//1')
            .set('Authorization', validToken)
            .send({
                "adres": "help"
            })
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    });

    it('Throw error on missing adress', (done) => {
        chai.request('localhost:3000')
            .put('/api/protected/studentenhuis/1')
            .set('Authorization', validToken)
            .send({
                "Naam": "string"
            })
            .end((err, res) => {
                res.should.have.status(412);

                done()
            });
    })
});

describe('Studentenhuis DELETE', () => {
    it('Throw error on invalid token', (done) => {
        chai.request('localhost:3000')
            .delete('/api/protected/studentenhuis')
            .set('Authorization', validToken)
            .send({
                "Naam": "jjjjjjjjjjjj",
                "Adres": "dddddddd"
            })
            .end((err, res) => {
                done()
            });
    });

    it('Delete studenthuis', (done) => {
        chai.request('localhost:3000')
            .delete('/api/protected/studentenhuis/' + deleteID)
            .set('Authorization', validToken)
            .end((err, res) => {
                res.should.have.status(200);

                done()
            });
    });

});