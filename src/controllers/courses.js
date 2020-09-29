const Course = require('../models').Course;

const { responseToSequelizeError } = require('../utils/responses');

function getAllCourses(req, res) {
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    Course.findAndCountAll({
            limit: limit,
            offset: offset    
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });    
}

module.exports = {
    getAllCourses 
}