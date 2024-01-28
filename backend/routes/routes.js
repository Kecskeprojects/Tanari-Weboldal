import express from 'express';
import { checkUser } from './protect-routes.js';
import FileController from '../controller/FileController.js';
import UserController from '../controller/UserController.js';
import NavController from '../controller/NavController.js';
import LinkController from '../controller/LinkController.js';
import VisitController from '../controller/VisitController.js';

export default function getRoutes() {
	const routers = express.Router();

	routers.get('/File/GetAll/', FileController.getAll);
	routers.get('/File/GetById/:id', FileController.getById);
	routers.post('/File/Create/', checkUser, FileController.create);
	routers.delete('/File/Delete/:id', checkUser, FileController.delete);

	routers.get('/Link/GetAll/', LinkController.getAll);
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
