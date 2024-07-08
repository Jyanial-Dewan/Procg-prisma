import { Request, Response } from "express";
import prisma from "../Services/prisma";

export const defUserCredentialsController = {
    async index(req: Request, res: Response) {
        const defTenants = await prisma.def_user_credentials.findMany();

        return res.status(200).json(defTenants)
    },

    async uniqueUserCredential(req: Request, res: Response){
        const userCredentialId = Number(req.params.id)

        const findUserCredential = await prisma.def_user_credentials.findUnique({
            where: {
                user_id: userCredentialId
            }
        })

        if(!findUserCredential) {
            return res.status(404).json({message: "User Credential is not found"})
        }
 
        return res.status(200).json(findUserCredential)
    },

    async createUserCredential(req: Request, res: Response) {
        const userCredentialData = req.body

        const findUserCredential = await prisma.def_user_credentials.findUnique({
            where: {
                user_id: userCredentialData.user_id
            }
        })

        if(findUserCredential) {
            return res.status(408).json({message: "User Credential already exist"})
        }

        if(!userCredentialData.user_id || !userCredentialData.password) {
            return res.status(422).json({message: "User_id and password is required"})
        }

        const newUSerCredential = await prisma.def_user_credentials.create({
            data: {
                user_id: userCredentialData.user_id,
                password: userCredentialData.password
            }
        });

        return res.status(201).json({newUSerCredential})
    },

    async deleteUserCredential(req: Request, res: Response){
        const userCredentialID = Number(req.params.id);

        const findDefTenant = await prisma.def_user_credentials.findUnique({
            where: {
                user_id: userCredentialID
            }
        });

        if(!findDefTenant) {
            return res.status(404).json({message: "User Credential not found"})
        }

        const deletedUserCredential = await prisma.def_user_credentials.delete({
            where: {
                user_id: userCredentialID
            }
        })

        return res.status(200).json({deletedUserCredential})
    },

    async updateUserCredential(req: Request, res: Response) {
        const userCredentialId = Number(req.params.id);
        const userCredentialData = req.body;

        const findUserCredential = await prisma.def_user_credentials.findUnique({
            where: {
                user_id: userCredentialId
            }
        });

        if(!findUserCredential) {
            return res.status(404).json({message: "User Credential not found"})
        }

        if(!userCredentialData.password){
            return res.status(422).json({message: "Password is required"})
        }
        
        const updatedUserCredential = await prisma.def_user_credentials.update({
            where: {
                user_id: userCredentialId
            },
            data: {
                password: userCredentialData.password
            }
        });

        return res.status(201).json({updatedUserCredential})
    }
}