
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');

chai.should();
chai.use(chaiHttp);

let validToken;

describe('Registration', () => {
    it('should return a token when providing valid information', (done) => {

        rndm = Math.floor(Math.random() * Math.floor(50000));

        chai.request('localhost:3000')
            .post('/api/public/register')
            .send({
                "Voornaam": "Sander",
                "Achternaam": "Postma",
                "Email": "Sander@r" + rndm + "otzii.nl",
                "Wachtwoord": "rotzii"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                let validToken = res.body.token;


                validToken.should.be.a('string')

                done()
            });
    });

    it('should return an error on GET request', (done) => {

        chai.request('localhost:3000')
            .get('/api/public/register')
            .end((err, res) => {
                res.should.have.status(404)
                done()
            });
    });

    it('should throw an error when the user already exists', (done) => {
        chai.request('localhost:3000')
            .post('/api/public/register')
            .send({
                "Voornaam": "Sander",
                "Achternaam": "Postma",
                "Email": "Sander@rotzii.nl",
                "Wachtwoord": "rotzii"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            });
    });

    it('should throw an error when no firstname is provided', (done) => {
        chai.request('localhost:3000')
            .post('/api/public/register')
            .send({
                "Achternaam": "string",
                "Email": "string@string.nl",
                "Wachtwoord": "string"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when firstname is shorter than 2 chars', (done) => {
        chai.request('localhost:3000')
            .post('/api/public/register')
            .send({
                "Voornaam": "a",
                "Achternaam": "string",
                "Email": "bpk@gmail.com",
                "Wachtwoord": "string"

            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when no lastname is provided', (done) => {
        chai.request('localhost:3000')
            .post('/api/public/register')
            .send({
                "Voornaam": "string",
                "Email": "string@sss.nl",
                "Wachtwoord": "string"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when lastname is shorter than 2 chars', (done) => {
        chai.request('localhost:3000')
            .post('/api/public/register')
            .send({
                "Voornaam": "string",
                "Achternaam": "a",
                "Email": "bp@avans.nl",
                "Wachtwoord": "string"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when email is invalid', (done) => {
        chai.request('localhost:3000')
            .post('/api/public/register')
            .send({
                "Voornaam": "string",
                "Achternaam": "achmend",
                "Wachtwoord": "string"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    })

});

describe('Login', () => {

    it('should return a token when providing valid information', (done) => {
        chai.request('localhost:3000')
            .post('/api/public/login')
            .send({
                "Email": "Jack@box.nl",
                "Wachtwoord": "Wachtwoord"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                let validToken = res.body.token;


                validToken.should.be.a('string');

                done()
            });
    });
    it('should throw an error when email does not exist', (done) => {

        chai.request('localhost:3000')
            .post('/api/public/login')
            .send({
                "Email": "bestaatniet@email.com",
                "Wachtwoord": "string"
            })
            .end((err, res) => {
                res.should.have.status(401)
                done()
            });

    });

    it('should throw an error when email exists but password is invalid', (done) => {

        chai.request('localhost:3000')
            .post('/api/public/login')
            .send({
                "Email": "Jack@box.nl",
                "Wachtwoord": "thebombb"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    });

    it('should throw an error when using an invalid email', (done) => {
        chai.request('localhost:3000')
            .post('/api/public/login')
            .send({
                "email": "invaliddd",
                "password": "box"
            })
            .end((err, res) => {
                res.should.have.status(412)
                done()
            });
    })
});