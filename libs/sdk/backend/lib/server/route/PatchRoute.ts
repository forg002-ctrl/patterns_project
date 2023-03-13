import { Server } from './../../Server';
import { IRouteOptions, Route } from './../Route';
import { NextFunction, Request, Response } from 'express';

export abstract class PatchRoute extends Route {
    public constructor(options: IRouteOptions) {
        super(options);

        this.method = 'PATCH';
    }

    public async register(server: Server): Promise<void> {
        server.getRouter()
            .patch(
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
