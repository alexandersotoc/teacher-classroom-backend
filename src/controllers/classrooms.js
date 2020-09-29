const { User, Item, Topic, Course, Classroom } = require('../models')

const { responseToSequelizeError } = require('../utils/responses');

function getClassrooms(req, res) {
    const userId = req.user.user_id;
    const offset = req.query.offset || 0;
    const limit = req.query.limit || 20;
    Classroom.findAndCountAll({
            limit: limit,
            offset: offset,
            where: { teacher_id: userId },
            include: [
                {
                    model: Course,
                    as: 'course'
                }
            ],
            attributes: { exclude: ['teacher_id', 'course_id'] }   
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        }); 
}

function getStudents(req, res) {
    const userId = req.user.user_id;
    const classroomId = req.params.classroomId;
    Classroom.findOne({
        where: {
            teacher_id: userId,
            classroom_id: classroomId 
        },
        include: [
            {
                model: User,
                as: 'students',
                through: { attributes: [] },
                attributes: { exclude: ['password'] }   
            },
        ],
        attributes: { exclude: ['teacher_id', 'course_id', 'start_date'] }   
    })
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        responseToSequelizeError(res, err);
    }); 
}

function getTopics(req, res) {
    const userId = req.user.user_id;
    const classroomId = req.params.classroomId;
    Classroom.findOne({
            where: { 
                classroom_id: classroomId,
                teacher_id: userId 
            },
            include: [
                {
                    model: Topic,
                    as: 'topics',
                    attributes: { exclude: ['classroom_id'] }   
                }
            ],
            attributes: { exclude: ['teacher_id', 'course_id', 'start_date'] }   
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });     
}

async function getCurrentNumberOfTopics(classroomId) {
    return Topic.count({
                where: { classroom_id: classroomId }  
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                responseToSequelizeError(res, err);
            });   
}

async function createTopic(req, res) {
    const name = req.body.name;
    const classroomId = req.params.classroomId;
    const currentNumberOfTopics = await getCurrentNumberOfTopics(classroomId);
    Topic.create({
            name: name,
            display_order: currentNumberOfTopics + 1,
            classroom_id: classroomId 
        })
        .then(result => {
            res.status(201).json({
                message: 'Topic created'
            });
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });   
}

function getItems(req, res) {
    const topicId = req.params.topicId;
    Topic.findOne({
            where: { 
                topic_id: topicId
            },
            include: [
                {
                    model: Item,
                    as: 'items',
                }
            ],
            attributes: { exclude: ['classroom_id', 'display_order', 'start_date'] }   
        })
        .then(result => {
            res.status(200).json(result);
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        }); 
}

async function getCurrentNumberOfItems(topicId) {
    return Item.count({
                where: { topic_id: topicId }  
            })
            .then(result => {
                return result;
            })
            .catch(err => {
                responseToSequelizeError(res, err);
            });   
}

async function createItem(req, res) {
    const { title, description, type } = req.body;
    const topicId = req.params.topicId;
    const currentNumberOfItems = await getCurrentNumberOfItems(topicId);
    Item.create({
            title: title,
            description: description,
            display_order: currentNumberOfItems + 1,
            type: type,
            topic_id: topicId 
        })
        .then(result => {
            res.status(201).json({
                message: 'Topic created'
            });
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });        
}

module.exports = {
    getClassrooms,
    getStudents,
    getTopics,
    createTopic,
    getItems,
    createItem
}