import { MongoClient as BaseMongoClient, Db } from 'mongodb';

export class MongoClient {
    protected mongoEndpoint: string;
    protected mongoClient: BaseMongoClient;
    private static instance: MongoClient;

    protected constructor(mongoEndpoint: string) {
        this.mongoEndpoint = mongoEndpoint;

        MongoClient.instance = this;
    }

    public static Init(mongoEndpoint: string): void {
        if (this.instance) {
            throw new Error('Database already initialized');
        }

        this.instance = new MongoClient(mongoEndpoint);
    }

    public static GetInstance(): MongoClient {
        if (!(this.instance instanceof MongoClient)) {
            throw new Error('Database not ready');
        }

        return this.instance;
    }


    public static getInstance(): MongoClient {
        return this.GetInstance();
    }

    public getMongoClient(): BaseMongoClient {
        return this.mongoClient;
    }

    public async getConnection(): Promise<Db> {
        if (!this.mongoClient) {
            this.mongoClient = await this.createConnection(this.mongoEndpoint);

            return this.mongoClient.db();
        }

        return this.mongoClient.db();
    }

    private async createConnection(uri: string): Promise<BaseMongoClient> {
        let mongoClient = new BaseMongoClient(uri);

        return mongoClient.connect();
    }
}

