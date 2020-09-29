const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_KEY = process.env.JWT_KEY;
const expiresIn = { expiresIn: '7d' }
const { ACCOUNT_STATUS, TYPE_OF_ACCOUNT } = require('../constants/user');

const User = require('../models').User;

const { responseToSequelizeError } = require('../utils/responses')

function signin (req, res) {
    const body = req.body;
    User.findOne({ 
            where: { 
                email: body.email,
                type_of_account: TYPE_OF_ACCOUNT.TEACHER
            } 
        })
        .then(user => {
            if (user === null){
                return res.status(401).json({
                    message: 'No se ha encontrado al usuario'
                });
            }   
            if (!bcrypt.compareSync(body.password, user.password)){
                return res.status(401).json({
                    message: 'Contraseña errónea'
                });
            }
            if (user.account_status !== ACCOUNT_STATUS.ACTIVE) {
                return res.status(400).json({
                    message: 'Su cuenta no se encuentra activa'
                });
            }
            const payload = {
                user_id: user.user_id,
                email: user.email,
                type_of_account: user.type_of_account,
                firstName: user.first_name,
                lastName: user.last_name
            }
            const token = jwt.sign(payload, JWT_KEY, expiresIn);
            const response = {
                token: token,
                user: {
                    firstName: user.first_name,
                    lastName: user.last_name
                }
            }
            return res.status(200).json(response);
        })
        .catch(err => {
            responseToSequelizeError(res, err);
        });
}


module.exports = {
    signin
}