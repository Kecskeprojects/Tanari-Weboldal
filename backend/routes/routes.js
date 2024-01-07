import express from 'express';
import { checkUser } from './protect-routes.js';
import FileController from '../controller/FileController.js';
import UserController from '../controller/UserController.js';
import NavController from '../controller/NavController.js';

export default function getRoutes() {
	const routers = express.Router();

	routers.get('/File/GetAll/', FileController.getAll);
	routers.get('/File/GetById/:id', FileController.getById);
	routers.post('/File/Create/', checkUser, FileController.create);
	routers.delete('/File/Delete/:id', checkUser, FileController.delete);
	routers.post('/User/Login/', UserController.login);
	routers.get('/Nav/GetAll/', NavController.getAll);
	routers.get('/Nav/GetAllForNavbar/', NavController.getAllForNav);
	routers.post('/Nav/Create/', checkUser, NavController.create);
	routers.delete('/Nav/Delete/:id', checkUser, NavController.delete);

	return routers;
}
