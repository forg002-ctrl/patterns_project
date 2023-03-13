require('module-alias/register');
import dotenv from 'dotenv';
dotenv.config();

import { Config } from '@lib/Config';
import App from '@src/lib/App';
import { routeIndex } from '@src/routes/routeIndex';

(async (): Promise<void> => {
    Config.Init({
        http_server_port: Number(process.env.HTTP_SERVER_PORT),
        mongodb_endoint: process.env.MONGO_DB_ENDPOINT as string,
    });

    let app = new App();
    await app.run(routeIndex);
})();