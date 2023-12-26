import { PrismaClient } from '@prisma/client';
import BaseController from './BaseController.js';

export default class FileController extends BaseController {
    static getAll = async (req, res) => {
        try {
            const prisma = new PrismaClient();

            var where;
            if (req.query?.location) {
                where = { Location: req.query.location };
            }

            prisma.file.findMany({ where: where, select: { FileId: true, Name: true, Extension: true, Location: true } })
                .then(async (result) => {
                    const completeList = [];
                    if (result) {
                        completeList.push(result);
                    }
                    await prisma.$disconnect()
                    this.handleResponse(res, completeList);
                })
                .catch(async (e) => {
                    await prisma.$disconnect();
                    this.handleError(res, e);
                })
        } catch (e) {
            this.handleError(res, e);
        }
    };

    static getById = async (req, res) => {
        try {
            const id = parseInt(req.params.id);
            if (!id || Number.isNaN(id)) {
                this.handleError(res, null, 500, "Id is not a number");
                return;
            }

            const prisma = new PrismaClient();
            prisma.file.findFirst({ where: { FileId: id } })
                .then(async (result) => {
                    let entity;
                    if (result) {
                        entity = result;
                    }
                    await prisma.$disconnect()
                    this.handleResponse(res, entity);
                })
                .catch(async (e) => {
                    await prisma.$disconnect();
                    this.handleError(res, e);
                })
        } catch (e) {
            this.handleError(res, e);
        }
    };

    static create = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            prisma.file.create({
                data:
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
                    this.handleResponse(res, { result: "File added to database." });
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
            const id = parseInt(req.params.id);
            if (!id || Number.isNaN(id)) {
                this.handleError(res, null, 500, "Id is not a number");
                return;
            }

            const prisma = new PrismaClient();
            prisma.file.delete({ where: { FileId: id } })
                .then(async () => {
                    await prisma.$disconnect()
                    this.handleResponse(res, { result: "File removed from database." });
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