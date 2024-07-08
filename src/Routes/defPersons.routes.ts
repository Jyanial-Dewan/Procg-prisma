import { Router } from "express";
import { defPersonsController } from "../Controller/defPersons.controller";

const routes = Router();

routes.get('/', defPersonsController.index )
routes.get('/:id', defPersonsController.uniqueDefPerson )
routes.post('/', defPersonsController.createDefPerson);
routes.delete('/:id', defPersonsController.deleteDefPerson);
routes.put('/:id', defPersonsController.updateDefPerson)

export default routes;