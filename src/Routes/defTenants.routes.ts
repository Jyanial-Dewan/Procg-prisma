import { Router } from "express";
import { defTenentsController } from "../Controller/defTenants.controller";

const routes = Router();

routes.get('/', defTenentsController.index);
routes.get('/:id', defTenentsController.uniqueDefTenants);
routes.post('/', defTenentsController.createDefTenant);
routes.delete('/:id', defTenentsController.deleteDefTenant);
routes.put('/:id', defTenentsController.updateDefTenant)

export default routes