import { Route } from '@src/ext/sdk/backend/lib/server/Route';

import { GetPingRoute } from '@src/routes/ping/GetRoute';

export const routeIndex: Array<Route> = [
    new GetPingRoute(),
];
