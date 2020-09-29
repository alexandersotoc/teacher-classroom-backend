const jwt = require('jsonwebtoken');
const JWT_KEY = process.env.JWT_KEY;

const { TYPE_OF_ACCOUNT } = require('../constants/user');

function checkAuth(req, res, next) {
    const token = req.headers['user-token'];
    if (!token){
        return res.status(401).json({
            message: "Auth failed"
        });
    }
    jwt.verify(token, JWT_KEY, (err, decodedToken) => {
        if (err){
            return res.status(401).json({
                message: "Auth failed"
            });
        }
        if (decodedToken.type_of_account !== TYPE_OF_ACCOUNT.TEACHER) {
            return res.status(401).json({
                message: "Only teachers can access content"
            });
        }
        req.user = decodedToken;
        next();
    });
} 

module.exports = {
    checkAuth
};