import { PrismaClient } from '@prisma/client';
import BaseController from './BaseController.js';

export default class FileController extends BaseController {
    static getAll = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            const completeList = [];
            var where;
            if(req.query?.location){
                where = {Location: req.params.location};
            }
            prisma.file.findMany({where: where, select:{FileId: true, Name: true, Extension: true}})
            .then(async (result) => {
                if(result){
                    completeList.push(result);
                }
                await prisma.$disconnect()
                this.handleResponse(res, completeList);
            })
            .catch(async (e) => {
                this.handleError(res, e);
                await prisma.$disconnect();
            })
        } catch (e) {
            this.handleError(res, e);
        }
    };

    static getById = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            let entity;
            prisma.file.findFirst({where: {FileId: req.params.id}})
            .then(async (result) => {
                if(result){
                    entity = result;
                }
                await prisma.$disconnect()
                this.handleResponse(res, completeList);
            })
            .catch(async (e) => {
                this.handleError(res, e);
                await prisma.$disconnect();
            })
        } catch (e) {
            this.handleError(res, e);
        }
    };

    static create = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            prisma.file.create({data: 
                {
                    Content: req.body.content,
                    Name: req.body.name,
                    Extension: req.body.extension,
                    Location: req.body.location,
                    CreatedOn: new Date()
                }
            })
            .then(async () => {
                await prisma.$disconnect()
                this.handleResponse(res, "File added to database.");
            })
            .catch(async (e) => {
                this.handleError(res, e);
                await prisma.$disconnect();
            })
        } catch (e) {
            this.handleError(res, e);
        }
    };

    static delete = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            prisma.file.delete({where: {FileId: req.params.id}})
            .then(async () => {
                await prisma.$disconnect()
                this.handleResponse(res, "File removed from database.");
            })
            .catch(async (e) => {
                this.handleError(res, e);
                await prisma.$disconnect();
            })
        } catch (e) {
            this.handleError(res, e);
        }
    };
}