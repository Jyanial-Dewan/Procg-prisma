import { Router } from "express";
import { defUserCredentialsController } from "../Controller/defUSerCredentials.controller";

const routes = Router();

routes.get('/', defUserCredentialsController.index);
routes.get('/:id', defUserCredentialsController.uniqueUserCredential);
routes.post('/', defUserCredentialsController.createUserCredential);
routes.delete('/:id', defUserCredentialsController.deleteUserCredential);
routes.put('/:id', defUserCredentialsController.updateUserCredential);

export default routes;