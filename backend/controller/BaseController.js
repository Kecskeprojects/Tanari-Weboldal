export default class BaseController {
	static handleResponse(res, content, status = 200) {
		res.status(status).json({ ...content });
	}

	static handleFileResponse(res, content, status = 200) {
		res.setHeader('content-disposition', `attachment`);
		res.setHeader('content-type', 'application/octet-stream');
		res.status(status).send(content);
	}

	static handleError(
		res,
		err = null,
		status = 500,
		message = 'Database error occurred.'
	) {
		if (err) {
			console.error(err);
		}
		res.status(status).json({ error: message });
	}
}
