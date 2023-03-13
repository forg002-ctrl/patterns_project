import { Config } from '@lib/Config';
import { Server } from '@src/ext/sdk/backend/lib/Server';
import { Documentation } from '@src/ext/sdk/backend/lib/swagger/Documentation';
import { Route } from '@src/ext/sdk/backend/lib/server/Route';
import { InitMongoDb } from '@src/ext/sdk/backend/mongo';

export default class App {
    private server?: Server;

    public async run(routes: Route[]): Promise<void> {
        await this.initServer(routes);
        // await this.initDatabase();

        if (!(this.server instanceof Server)) {
            throw new Error('Server must be initialized before Handler init');
        }

        await this.initRoutes(routes);
        this.server.start();
    }

    public getServer(): Server {
        if (!this.server) {
            throw new Error('Server not ready');
        }

        return this.server;
    }

    private async initServer(routes: Route[]): Promise<void> {
        Server.Init({
            port: Config.HTTP_SERVER_PORT,
            documentation: new Documentation({
                title: 'Accounting Service API',
                description: 'How to use the Accounting Service API',
                version: '0.0.1',
            }),
        });

        this.server = Server.GetInstance();
    }

    private async initRoutes(routes: Array<Route>): Promise<void> {
        for (let route of routes) {
            await route.register(this.getServer());
        }
    }

    private async initDatabase(): Promise<void> {
        InitMongoDb(Config.MONGO_DB_ENDPOINT);
        // TODO: Add necessary Migrations 
    }
}