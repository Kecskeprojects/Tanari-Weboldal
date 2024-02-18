import express from 'express';
import { handleAuthorizationError } from './routes/protect-routes.js';
import getRoutes from './routes/routes.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import fs from 'fs';
import util from 'util';

//Overwriting console log to also log into debug.log
const __dirname = new URL('.', import.meta.url).pathname;
const log_file = fs.createWriteStream(__dirname.split('/')[1] + 'debug.log', {
	flags: 'w',
});
const log_stdout = process.stdout;

console.log = function (log) {
	log_file.write(util.format(log) + '\n');
	log_stdout.write(util.format(log) + '\n');
};

//Base backend setup
const app = express();
app.use(express.json());

app.use(
	cors({
		origin: process.env.ACCEPTED_ORIGIN,
	})
);

app.use(
	fileUpload({
		defCharset: 'utf8',
		defParamCharset: 'utf8',
	})
);

app.use('/api', getRoutes(), handleAuthorizationError);

app.listen(process.env.PORT, () => {
	console.log(
		`Server in '${process.env.ENVIRONMENT}' environtment is running on port '${process.env.PORT}'`
	);
});
