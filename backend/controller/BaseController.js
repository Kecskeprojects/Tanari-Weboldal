import { Readable } from 'stream';

export default class BaseController {
	/**
	 * @param {Response} res
	 * @param {Object} content
	 * @param {Number} status
	 */
	static handleResponse(res, content, status = 200) {
		res.setHeader('pragma', 'no-cache');
		res.setHeader('cache-control', 'no-cache');
		res.status(status).json({ ...content });
	}

	static handleListResponse(res, content, status = 200) {
		res.setHeader('pragma', 'no-cache');
		res.setHeader('cache-control', 'no-cache');
		res.status(status).json([...content]);
	}

	/**
	 * @param {Response} res
	 * @param {Uint8Array} content
	 * @param {Number} status
	 */
	static handleFileResponse(res, content, status = 200) {
		res.setHeader('content-disposition', `attachment`);
		res.setHeader('content-type', 'application/octet-stream');

		const buffer = Buffer.from(content);
		const stream = new Readable();
		stream.push(buffer);
		stream.push(null);

		res.status(status);
		stream.pipe(res, { end: true });
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
		message = 'Database error occurred'
	) {
		if (err) {
			console.log(err);
		}
		res.setHeader('pragma', 'no-cache');
		res.setHeader('cache-control', 'no-cache');
		res.status(status).json({ error: message });
	}
}
