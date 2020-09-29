const { Router } = require('express');
const router = Router();

const ClassroomsController = require('../controllers/classrooms');

const { checkAuth } = require('../middlewares/authentication');

router.get('/', checkAuth, ClassroomsController.getClassrooms);

router.get('/:classroomId/topics', checkAuth, ClassroomsController.getTopics);
router.post('/:classroomId/topics', checkAuth, ClassroomsController.createTopic);

router.get('/:classroomId/topics/:topicId/item', checkAuth, ClassroomsController.getItems);
router.post('/:classroomId/topics/:topicId/item', checkAuth, ClassroomsController.createItem);

router.get('/:classroomId/students', checkAuth, ClassroomsController.getStudents);

module.exports = router;