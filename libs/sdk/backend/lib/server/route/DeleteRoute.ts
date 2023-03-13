import { Server } from './../../Server';
import { IRouteOptions, Route } from './../Route';
import { NextFunction, Request, Response } from 'express';

export abstract class DeleteRoute extends Route {
    public constructor(options: IRouteOptions) {
        super(options);

        this.method = 'DELETE';
    }

    // TODO: Add middlewares
    public async register(server: Server): Promise<void> {
        server.getRouter()
            .delete(
                this.getRoute(),
                async (req: Request, res: Response, next: NextFunction) => {
                    await this.execute(req, res);
                    next();
                },
            );

        let docs = server.getSwaggerDocs();
        if (docs) {
            docs.addPath(this.getRoute(), this.getSwaggerDescription());
        }
    }
}
