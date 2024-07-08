import { Request, Response } from "express";
import prisma from "../Services/prisma";

// type DefPerson = {
//     user_id: number;
//     first_name: string;
//     middle_name: string;
//     last_name: string;
//     job_title: string
// }

export const defPersonsController = {
    async index(req: Request, res: Response) {
        const defPersons = await prisma.def_persons.findMany();
        return res.json(defPersons)
    },

    async uniqueDefPerson(req: Request, res: Response){
        const defPersonID = Number(req.params.id);

        const findDefPerson = await prisma.def_persons.findUnique({
            where: {
                user_id: defPersonID
            }
        })

        if(!findDefPerson) {
           return res.status(404).json({error: "Person not found"})
        }
        
        return res.status(200).json(findDefPerson);
    },

    async createDefPerson(req: Request, res: Response){
        const defPersonData = req.body;

        const findDefPerson = await prisma.def_persons.findUnique({
            where: {
                user_id: defPersonData.user_id
            }
        })

        if(findDefPerson) {
           return res.status(408).json({message: "Person already exist"})
        }

        if(!defPersonData.first_name || !defPersonData.job_title || !defPersonData.user_id) {
            return res.status(422).json({message: "User_id, first_name and job_title is required"})
        }

        const newDefPerson = await prisma.def_persons.create({
            data: {
                user_id: defPersonData.user_id,
                first_name: defPersonData.first_name,
                middle_name: defPersonData.middle_name,
                last_name: defPersonData.last_name,
                job_title: defPersonData.job_title
            }
        });

        return res.status(201).json(newDefPerson)
    },

    async deleteDefPerson(req: Request, res: Response) {
        const defPersonID = Number(req.params.id);

        const findDefPerson = await prisma.def_persons.findUnique({
            where: {
                user_id: defPersonID
            }
        })

        if(!findDefPerson) {
           return res.status(404).json({error: "Person not found"})
        }

        const deletedDefPerson = await prisma.def_persons.delete({
            where: {
                user_id: defPersonID
            }
        })

        return res.status(204).json({deletedDefPerson})
    },

    async updateDefPerson(req: Request, res: Response) {
        const defPersonID = Number(req.params.id);
        const defPersonData = req.body;

        const findDefPerson = await prisma.def_persons.findUnique({
            where: {
                user_id: defPersonID
            }
        })

        if(!findDefPerson) {
            return res.status(404).json({message: "Person not found"})
         }

         if(!defPersonData.first_name || !defPersonData.job_title) {
            return res.status(422).json({message: "first_name and job_title is required"})
        }

        const updatedDefPerson = await prisma.def_persons.update({
            where: {
                user_id: defPersonID
            },
            data: {
                first_name: defPersonData.first_name,
                middle_name: defPersonData.middle_name,
                last_name: defPersonData.last_name,
                job_title: defPersonData.job_title
            }
        })

        return res.status(200).json({updatedDefPerson})
    }
}