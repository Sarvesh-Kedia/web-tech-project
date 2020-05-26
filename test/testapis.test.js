var supertest = require("supertest");
var should = require("should");
const assert = require('assert');


// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000");

// UNIT test begin

describe("Unit Testing various requests to the server",function(){

  // #1 should return home page
  it("1. Should return home page",function(done){

    // calling home page api
    server
    .get("/")
    .end(function(err,res){
        // HTTP status should be 200
        //console.log("333333333333333333333333", res.request._data.name)
        assert.equal(res.status, 200);
      done();
    });
  });



  it("2. Data received in the api function from the client should not be undefined",function(done){

    // calling home page api
    server
    .get("/home/addtowishlist")
    .send({coursename: "Intro to ML" })
    .end(function(err,res){
        // console.log("#########", res.request._data.coursename)
        assert(res.request._data !== undefined);

      done();
    });
  });


  it("3. Analytics data should be in json format",function(done){

    // calling home page api
    server
    .get("/home/analytics")
    .end(function(err,res){
        // console.log("#########", res.res.text, typeof res.res.text)
        assert(typeof res.res.text == "object");
      done();
    });
  });



  it("4. Data received in the api function from the client should be a string",function(done){

    // calling home page api
    server
    .get("/home/getrecs")
    .send({coursename: "Intro to ML" })
    .end(function(err,res){
        // console.log("#########", typeof res.request._data.coursename)
        assert(typeof res.request._data.coursename == "string");

      done();
    });
  });


  it("5. recommendations data being sent to front end should be in array format",function(done){

    // calling home page api
    server
    .get("/home/getrecs")
    .end(function(err,res){
        // console.log("#########", res.res.text, typeof res.res.text)
        assert(typeof res.res.text == "array");
      done();
    });
  });


  it("6. Wishlist can have zero or more items",function() {

    // calling home page api
    return server
    .get("/home/getwishlist")
    .send({coursename: "hello"})
    .then(function(err,res){
        // console.log("#########", JSON.parse(err.res.text).courses.length)
        // console.log("#########", res.res.text)

        var listlen = JSON.parse(err.res.text).courses.length
        assert( listlen >= 0);
    })
  });







});