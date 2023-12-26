import { PrismaClient } from '@prisma/client';
import BaseController from './BaseController.js';

export default class NavController extends BaseController {
    static getAll = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            prisma.nav.findMany({ select: { NavId: true, Name: true, Url: true, ParentNavId: true } })
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

    static getAllForNav = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            prisma.nav.findMany({
                where: { ParentNavId: null },
                include: {
                    other_nav: {
                        include: {
                            other_nav: {
                                include: {
                                    other_nav: {
                                        include: {
                                            other_nav: {
                                                include: {
                                                    other_nav: {
                                                        include: {
                                                            other_nav: true
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })//Pandora
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

    static create = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            prisma.nav.create({
                data:
                {
                    ParentNavId: req.body.parentId,
                    Name: req.body.name,
                    Url: req.body.url,
                    CreatedOn: new Date()
                }
            })
                .then(async () => {
                    await prisma.$disconnect()
                    this.handleResponse(res, { result: "Nav added to database." });
                })
                .catch(async (e) => {
                    await prisma.$disconnect();
                    this.handleError(res, e);
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
            prisma.nav.delete({ where: { NavId: id } })
                .then(async () => {
                    await prisma.$disconnect()
                    this.handleResponse(res, { result: "Nav removed from database." });
                })
                .catch(async (e) => {
                    await prisma.$disconnect();
                    this.handleError(res, e);
                })
        } catch (e) {
            this.handleError(res, e);
        }
    };
}