import express, { Express as ExpressApp, Request, Response, Router } from 'express';
import cookieParser from 'cookie-parser';
import { Server as HttpServer } from 'http';
import swaggerUi from 'swagger-ui-express';

import { Documentation } from './swagger/Documentation';

export interface IServerOption {
    port: number;
    bodySizeLimit?: string;
    documentation?: Documentation;
    express?: ExpressApp;
}

export interface IServer {}

export class Server {
    private static instance: Server;

    private expressApp: ExpressApp;
    private port: number;
    private server?: HttpServer;
    private router?: Router;
    private swaggerDocs?: Documentation;

    private constructor(options: IServerOption) {
        this.port = options.port;
        this.swaggerDocs = options.documentation;

        this.expressApp = options.express || express();
        this.expressApp.use(express.json({ limit: options.bodySizeLimit || '20mb' }));
        this.expressApp.use(cookieParser());
        // TODO: Add middlewares here
    }

    public start(): void {
        this.enableDocumentation();

        if (this.port === 0) {
            throw new Error('Port can not be 0');
        }

        this.server = this.expressApp.listen(this.port);
        this.server?.once('listening', () => {
            console.log(`Server listening for connection on ${this.port}`);
        });
    }

    public static Init(options: IServerOption): void {
        if (this.instance) {
            throw new Error('Server already initialized');
        }

        this.instance = new Server(options);
    }

    public static GetInstance(): Server {
        if (!this.instance) {
            throw new Error('Server not initialized');
        }

        return this.instance;
    }

    protected enableDocumentation(): void {
        let docs = this.getSwaggerDocs();
        if (!docs) {
            return;
        }

        let swaggerDocs = docs.getJsDoc();
        let swaggerDocsHtml = swaggerUi.generateHTML(swaggerDocs);

        let router = this.getRouter();
        router.use('/swagger', swaggerUi.serveFiles(swaggerDocs));
        router.get('/swagger', (req: Request, res: Response): void => {
            res.send(swaggerDocsHtml);
        });
    }

    public getRouter(): Router {
        if (!this.router) {
            this.router = Router();
            this.expressApp.use(this.router);
        }

        return this.router;
    }

    public getExpress(): ExpressApp {
        return this.expressApp;
    }

    public getSwaggerDocs(): Documentation | undefined {
        return this.swaggerDocs;
    }
}
