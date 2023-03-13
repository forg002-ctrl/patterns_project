import { Request, Response } from 'express';

import { routeDescription, IResponse200 } from '@src/ext/shared/service/routes/ping/GetDescription';
import { GetRoute } from '@src/ext/sdk/backend/lib/server/route/GetRoute';

export class GetPingRoute extends GetRoute {
    public constructor() {
        super({
            description: routeDescription,
        });
    }

    public async main(req: Request, res: Response): Promise<void> {
        let body: IResponse200 = {
            pong: 'pong',
        };

        res.status(200).json(body);
    }
}
