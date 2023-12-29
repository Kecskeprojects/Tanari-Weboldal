import { PrismaClient } from '@prisma/client';
import BaseController from './BaseController.js';
import { Prisma } from '../prisma/PrismaClient.js';

export default class FileController extends BaseController {
    static getAll = async (req, res) => {
        const prisma = Prisma.getPrisma();
        try {
            await prisma.$connect();
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
                    this.handleResponse(res, completeList);
                })
                .catch(async (e) => {
                    this.handleError(res, e);
                })
        } catch (e) {
            this.handleError(res, e);
        }
        await prisma.$disconnect();
    };

    static getById = async (req, res) => {
        const prisma = Prisma.getPrisma();
        try {
            const id = parseInt(req.params.id);
            if (!id || Number.isNaN(id)) {
                this.handleError(res, null, 500, "Id is not a number");
                return;
            }

            await prisma.$connect();
            prisma.file.findFirst({ where: { FileId: id } })
                .then(async (result) => {
                    let entity;
                    if (result) {
                        entity = result;
                    }
                    this.handleResponse(res, entity);
                })
                .catch(async (e) => {
                    this.handleError(res, e);
                })
        } catch (e) {
            this.handleError(res, e);
        }
        await prisma.$disconnect();
    };

    static create = async (req, res) => {
        const prisma = Prisma.getPrisma();
        try {
            await prisma.$connect();
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
                    this.handleResponse(res, { result: "File added to database." });
                })
                .catch(async (e) => {
                    this.handleError(res, e);
                })
        } catch (e) {
            this.handleError(res, e);
        }
        await prisma.$disconnect();
    };

    static delete = async (req, res) => {
        const prisma = Prisma.getPrisma();
        try {
            await prisma.$connect();
            const id = parseInt(req.params.id);
            if (!id || Number.isNaN(id)) {
                this.handleError(res, null, 500, "Id is not a number");
                return;
            }

            prisma.file.delete({ where: { FileId: id } })
                .then(async () => {
                    this.handleResponse(res, { result: "File removed from database." });
                })
                .catch(async (e) => {
                    this.handleError(res, e);
                })
        } catch (e) {
            this.handleError(res, e);
        }
        await prisma.$disconnect();
    };
}