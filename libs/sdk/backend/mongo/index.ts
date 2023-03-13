import { MongoClient } from '../lib/persistence/mongo/MongoClient';

export function InitMongoDb(mongoEnpoint: string): void {
    MongoClient.Init(mongoEnpoint);
}