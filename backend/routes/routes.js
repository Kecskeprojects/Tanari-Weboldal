import express from "express";
import { checkUser } from "./protect-routes.js";
import FileController from "../controller/FileController.js";

export default function getRoutes() {
    const routers = express.Router();

    routers.get('/File/', FileController.getAll);
    routers.get('/File/:id', FileController.getById);
    routers.post('/File/', checkUser, FileController.create);
    routers.delete('/File/:id', checkUser, FileController.delete);

    return routers;
}