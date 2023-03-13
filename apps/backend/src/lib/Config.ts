export interface IConfigOptions {
    http_server_port: number;
    mongodb_endoint: string;
}

export class Config {
    private static instance: Config;

    public static HTTP_SERVER_PORT: number;
    public static MONGO_DB_ENDPOINT: string;

    private constructor(options: IConfigOptions) {
        Config.HTTP_SERVER_PORT = options.http_server_port;
        Config.MONGO_DB_ENDPOINT = options.mongodb_endoint;
    }

    public static Init(options: IConfigOptions): void {
        if (this.instance) {
            throw new Error('Already initialized');
        }

        this.instance = new Config(options);
    }

    public static GetInstance(): Config {
        if (!this.instance) {
            throw new Error('Not initialized');
        }

        return this.instance;
    }
}