import { Request, Response } from "express";
import prisma from "../Services/prisma";

export const defTenentsController = {
    async index(req: Request, res: Response) {
        const defTenants = await prisma.def_tenants.findMany();

        return res.status(200).json(defTenants)
    },

    async uniqueDefTenants(req: Request, res: Response){
        const tenatId = Number(req.params.id)

        const findDefTenats = await prisma.def_tenants.findUnique({
            where: {
                tenant_id: tenatId
            }
        })

        if(!findDefTenats) {
            return res.status(404).json({message: "Tenant is not found"})
        }
 
        return res.status(200).json(findDefTenats)
    },

    async createDefTenant(req: Request, res: Response) {
        const defTenantData = req.body

        const findDefTenats = await prisma.def_tenants.findUnique({
            where: {
                tenant_id: defTenantData.tenant_id
            }
        })

        if(findDefTenats) {
            return res.status(408).json({message: "Tenant already exist"})
        }

        if(!defTenantData.tenant_id || !defTenantData.tenant_name) {
            return res.status(422).json({message: "Tenant_id and Tenant name is required"})
        }

        const newDefTenant = await prisma.def_tenants.create({
            data: {
                tenant_id: defTenantData.tenant_id,
                tenant_name: defTenantData.tenant_name
            }
        });

        return res.status(201).json({newDefTenant})
    },

    async deleteDefTenant(req: Request, res: Response){
        const defTenantID = Number(req.params.id);

        const findDefTenant = await prisma.def_tenants.findUnique({
            where: {
                tenant_id: defTenantID
            }
        });

        if(!findDefTenant) {
            return res.status(404).json({message: "Tenant not found"})
        }

        const deletedDefTenant = await prisma.def_tenants.delete({
            where: {
                tenant_id: defTenantID
            }
        })

        return res.status(200).json({deletedDefTenant})
    },

    async updateDefTenant(req: Request, res: Response) {
        const defTenantId = Number(req.params.id);
        const defTenantData = req.body;

        const findDefTenant = await prisma.def_tenants.findUnique({
            where: {
                tenant_id: defTenantId
            }
        });

        if(!findDefTenant) {
            return res.status(404).json({message: "Tenant not found"})
        }

        if(!defTenantData.tenant_name){
            return res.status(422).json({message: "Tenant_name is required"})
        }
        
        const updatedDefTenant = await prisma.def_tenants.update({
            where: {
                tenant_id: defTenantId
            },
            data: {
                tenant_name: defTenantData.tenant_name
            }
        });

        return res.status(201).json({updatedDefTenant})
    }
}