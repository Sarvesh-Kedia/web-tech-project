const assert = require('assert');

const User = require('../models/User');
const Course = require('../models/Course');



describe('Testing DB', () => {
    it('inserting new course', (done) => {
        //assertion is not included in mocha so 
        //require assert which was installed along with mocha
        const newcourse = new Course({ name: 'How to tie shoelaces', topic: "clothing", price: 3100, website: "edx"});
        newcourse.save() //takes some time and returns a promise
            .then(() => {
                assert(!newcourse.isNew); //if poke is saved to db it is not new
                // done();
            });
    });
});

