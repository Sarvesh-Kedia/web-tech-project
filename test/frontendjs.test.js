var supertest = require("supertest");
const assert = require('assert');
const scripts = require('../public/js/scripts');

// This agent refers to PORT where program is runninng.

var server = supertest.agent("http://localhost:5000");

// UNIT test begin

describe("Unit Testing front end JS functions",function(){


    it('1. Function analytics() return json', async () => {
        var result = await scripts.analytics()
        // console.log(result)
        assert(typeof result == "object")
    });

    it('2. Function displaywishlist() return json', async () => {
        var result = await scripts.displayWishlist()
        // console.log(typeof result.wishlist, result.wishlist)
        assert(typeof result == "object")
    });

    it('3. Function addtoWishlist() should invoke analytics() and hence return analytics data', async () => {
        var result = await scripts.addToWishList()
        console.log(result)
        // assert(typeof result == "object")
    });


});