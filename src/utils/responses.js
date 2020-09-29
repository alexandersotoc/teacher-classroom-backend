function responseToInvalidFormat (res) {
    res.status(400).json({
        message: 'Bad request'
    });
}

function responseToSequelizeError (res, err) {
    if (err.name === 'SequelizeValidationError' || 
        err.name === 'SequelizeUniqueConstraintError') {
		res.status(400).json({
			'message': 'Validation error'
		});
	} else {
        res.status(500).json({
            message: 'Internal server error',
            error: err
        });
    }
}

module.exports = {
    responseToInvalidFormat,
    responseToSequelizeError
};