import { PrismaClient } from '@prisma/client';
import BaseController from './BaseController.js';

export default class NavController extends BaseController {
    static getAllForNav = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            const completeList = [];
            prisma.nav.findMany({where: {ParentNavId: null},
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
    
    static getAll = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            const completeList = [];
            prisma.nav.findMany({select: {NavId: true, Name: true, Url: true, ParentNavId: true}})
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

    static create = async (req, res) => {
        try {
            const prisma = new PrismaClient();
            prisma.nav.create({data: 
                {
                    ParentNavId: req.body.parentId,
                    Name: req.body.name,
                    Url: req.body.url,
                    CreatedOn: new Date()
                }
            })
            .then(async () => {
                await prisma.$disconnect()
                this.handleResponse(res, "Nav added to database.");
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
            prisma.nav.delete({where: {NavId: req.params.id}})
            .then(async () => {
                await prisma.$disconnect()
                this.handleResponse(res, "Nav removed from database.");
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