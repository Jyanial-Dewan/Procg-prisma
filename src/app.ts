import express from 'express';
import cors from 'cors'
import { defPersonsRoutes, defTenatsRoutes, defUserCredentialsRoutes, defUsersRoutes } from './Routes';

class App {
    public server;

    constructor() {
        this.server = express();
        this.middlewares();
        this.routes()
    }

    middlewares() {
        this.server.use(express.json())
        this.server.use(cors())
    }

    routes() {
        this.server.use('/def-persons', defPersonsRoutes);
        this.server.use('/def-tenants', defTenatsRoutes);
        this.server.use('/def-user-credentials', defUserCredentialsRoutes);
        this.server.use('/def-users', defUsersRoutes);
    }
}

export default new App().server;