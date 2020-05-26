var supertest = require("supertest");
const assert = require('assert');
const User = require('../models/User');


// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000");

// UNIT test begin

describe("Unit Testing Login APIs (functionality not being tested) ",function(){

  // #1 should return home page


  it("1. register page should return success status code",function(done){

    // calling home page api
    server
    .get("/users/register")
    // .send({name: "sanjay", email: "sanjay@gmail.com", password: "qwerty", password2: "qwerty" })
    // .expect(200) // THis is HTTP response
    .end(function(err,res){
      // HTTP status should be 200
        assert.equal(res.status, 200);
      done();
    });
  });



  it("2. Passwords sent to server should be unhashed",function(done){

    // calling home page api
    server
    .post("/users/register")
    .send({name: "sanjay", email: "sanjay@gmail.com", password: "qwerty", password2: "qwerty" })
    // .expect(200) // THis is HTTP response
    .end(function(err,res){
        // console.log("string", typeof res.request._data.password)
        assert.equal(typeof res.request._data.password, "string");
        assert.equal(typeof res.request._data.password2, "string");
        // console.log(res.status)
      done();
    });
  });


  // it("3. Request should give multiple response error (status code 300)",function(done){

  //   // calling home page api
  //   server
  //   .post("/users/login")
  //   .send({email: "emaildoesnotexist@yucky.com", password: "whocaresaboutpassword"})
  //   // .expect(200) // THis is HTTP response
  //   .end(function(err,res){
  //       // console.log("string", typeof res.request._data.password)
  //       // assert.equal(typeof res.request._data.password, "string");
  //       // assert.equal(typeof res.request._data.password2, "string");
  //       result = res.status >= 300 && res.status < 400
  //       assert.equal(result, true);
  //       // console.log(result)
  //       // console.log(res.status)
  //     done();
  //   });
  // });







});