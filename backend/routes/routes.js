import express from "express";
import { checkUser } from "./protect-routes.js";
import FileController from "../controller/FileController.js";
import UserController from "../controller/UserController.js";
import NavController from "../controller/NavController.js";

export default function getRoutes() {
    const routers = express.Router();

    routers.get('/File/', FileController.getAll);
    routers.get('/File/:id', FileController.getById);
    routers.post('/File/', checkUser, FileController.create);
    routers.delete('/File/:id', checkUser, FileController.delete);
    routers.post('/User/', UserController.login);
    routers.get('/Nav/', NavController.getAll);
    routers.get('/Nav/ForNavbar', NavController.getAllForNav);
    routers.post('/Nav/', checkUser, NavController.create);
    routers.delete('/Nav/:id', checkUser, NavController.delete);

    return routers;
}