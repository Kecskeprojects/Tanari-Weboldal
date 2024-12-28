import express from 'express';
import FileController from '../controller/FileController.js';
import LinkController from '../controller/LinkController.js';
import NavController from '../controller/NavController.js';
import UserController from '../controller/UserController.js';
import VisitController from '../controller/VisitController.js';
import { checkUser } from './protect-routes.js';

export default function getRoutes() {
	const routers = express.Router();

	routers.get('/Status', (req, res) => {
		res.status(200).json(
			`Server in '${process.env.ENVIRONMENT}' environtment is running on port '${process.env.PORT}'`
		);
	});

	//Todo: Figure out https in IIS and make it work for the site in localhost
	routers.get('/File/GetAll/', FileController.getAll);
	routers.get('/File/GetRecent/', FileController.getRecent);
	routers.get('/File/GetBySearchResult/', FileController.getBySearchResult);
	routers.get('/File/GetById/:id', FileController.getById);
	routers.post('/File/Create/', checkUser, FileController.create);
	routers.delete('/File/Delete/:id', checkUser, FileController.delete);

	routers.get('/Link/GetAll/', LinkController.getAll);
	routers.get('/Link/GetRecent/', LinkController.getRecent);
	routers.get('/Link/GetBySearchResult/', LinkController.getBySearchResult);
	routers.post('/Link/Create/', checkUser, LinkController.create);
	routers.delete('/Link/Delete/:id', checkUser, LinkController.delete);

	routers.post('/User/Login/', UserController.login);

	routers.get('/Nav/GetAllForNavbar/', NavController.getAllForNav);
	routers.get('/Nav/GetById/:url', NavController.getByUrl);
	routers.post('/Nav/Create/', checkUser, NavController.create);
	routers.delete('/Nav/Delete/:id', checkUser, NavController.delete);

	routers.get('/Visit/Get/', VisitController.get);
	routers.put('/Visit/Update/', VisitController.update);

	return routers;
}
