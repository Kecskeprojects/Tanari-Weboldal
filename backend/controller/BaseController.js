export default class BaseController {
	/**
	 * @param {Response} res
	 * @param {Object} content
	 * @param {Number} status
	 */
	static handleResponse(res, content, status = 200) {
		res.status(status).json({ ...content });
	}

	/**
	 * @param {Response} res
	 * @param {ArrayBuffer} content
	 * @param {Number} status
	 */
	static handleFileResponse(res, content, status = 200) {
		res.setHeader('content-disposition', `attachment`);
		res.setHeader('content-type', 'application/octet-stream');
		res.status(status).send(content);
	}

	/**
	 * @param {Response} res
	 * @param {Error?} err
	 * @param {Number} status
	 * @param {String} message
	 */
	static handleError(
		res,
		err = null,
		status = 500,
		message = 'Database error occurred.'
	) {
		if (err) {
			console.log(err);
		}
		res.status(status).json({ error: message });
	}
}
