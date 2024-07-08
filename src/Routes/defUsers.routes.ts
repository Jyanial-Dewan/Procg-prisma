import { Router } from "express";
import { defUserController } from "../Controller/defUser.controller";

const routes = Router();

routes.get('/', defUserController.index);
routes.get('/:id', defUserController.uniqueUser);
routes.post('/', defUserController.createDefUser);
routes.delete('/:id', defUserController.deleteDefUser);
routes.put('/:id', defUserController.updateDefUser);

export default routes;