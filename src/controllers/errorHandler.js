function nonExistingEndpointHandler (req, res, next) {
    const error = new Error('Not found');
    error.status = 404;
    next(error);
}
  
function errorHandler (error, req, res, next) {
	res.status(error.status || 500)
	if (error.status == 404) {
		return res.json({
			message: 'The route does not exist'
		});
	} else {
		return res.json({
			message: 'Internal server error',
			error: error.message
		});
	}
}

module.exports = {
    nonExistingEndpointHandler,
    errorHandler
}
