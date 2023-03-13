import { Server } from './../../Server';
import { IRouteOptions, Route } from './../Route';
import { NextFunction, Request, Response } from 'express';

export abstract class GetRoute extends Route {
    public constructor(options: IRouteOptions) {
        super(options);

        this.method = 'GET';
    }

    public async register(server: Server): Promise<void> {
        server.getRouter()
            .get(
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
