import { Request, Response } from "express";
import prisma from "../Services/prisma";

export const defUserController = {
    async index(req: Request, res: Response) {
        const defUsers = await prisma.def_users.findMany();

        return res.status(200).json(defUsers)
    },

    async uniqueUser(req: Request, res: Response){
        const userId = Number(req.params.id)

        const findUser = await prisma.def_users.findUnique({
            where: {
                user_id: userId
            }
        })

        if(!findUser) {
            return res.status(404).json({message: "User is not found"})
        }
 
        return res.status(200).json(findUser)
    },

    async createDefUser(req: Request, res: Response) {
        const defUserData = req.body

        const findUserCredential = await prisma.def_users.findUnique({
            where: {
                user_id: defUserData.user_id
            }
        })

        if(findUserCredential) {
            return res.status(408).json({message: "User already exist"})
        }

        // if(!defUserData.user_id|| !defUserData.user_name || !defUserData.user_type || !defUserData.email_addresses || !defUserData.created_by || !defUserData.created_on || !defUserData.last_updated_by || !defUserData.last_updated_on || !defUserData.tenant_id) {
        //     return res.status(422).json({message: "all field is required"})
        // }

        const newUSer = await prisma.def_users.create({
            data: {
                user_id: defUserData.user_id,
                user_name: defUserData.user_name,
                user_type: defUserData.user_type,
                email_addresses: defUserData.email_addresses,
                created_by: defUserData.created_by,
                created_on: defUserData.created_on,
                last_updated_by: defUserData.last_updated_by,
                last_updated_on: defUserData.last_updated_on,
                tenant_id: defUserData.tenant_id
            }
        });

        return res.status(201).json({newUSer})
    },

    async deleteDefUser(req: Request, res: Response){
        const defUserID = Number(req.params.id);

        const findDefUser = await prisma.def_users.findUnique({
            where: {
                user_id: defUserID
            }
        });

        if(!findDefUser) {
            return res.status(404).json({message: "User not found"})
        }

        const deletedUser = await prisma.def_users.delete({
            where: {
                user_id: defUserID
            }
        })

        return res.status(200).json({deletedUser})
    },

    async updateDefUser(req: Request, res: Response) {
        const defUserId = Number(req.params.id);
        const defUserData = req.body;

        const findDefUser = await prisma.def_users.findUnique({
            where: {
                user_id: defUserId
            }
        });

        if(!findDefUser) {
            return res.status(404).json({message: "User not found"})
        }

        // if(!userCredentialData.password){
        //     return res.status(422).json({message: "Password is required"})
        // }
        
        const updatedDefUser = await prisma.def_users.update({
            where: {
                user_id: defUserId
            },
            data: {
                user_name: defUserData.user_name,
                user_type: defUserData.user_type,
                email_addresses: defUserData.email_addresses,
                created_by: defUserData.created_by,
                created_on: defUserData.created_on,
                last_updated_by: defUserData.last_updated_by,
                last_updated_on: defUserData.last_updated_on,
                tenant_id: defUserData.tenant_id
            }
        });

        return res.status(201).json({updatedDefUser})
    }
}