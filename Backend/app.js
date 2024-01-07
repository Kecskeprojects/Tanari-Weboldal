import express from 'express';
import { handleAuthorizationError } from './routes/protect-routes.js';
import getRoutes from './routes/routes.js';
import cors from 'cors';
import fileUpload from 'express-fileupload';

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
