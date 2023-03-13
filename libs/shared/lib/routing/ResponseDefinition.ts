import { SchemaObject } from 'ajv';
import { IResponseContent } from './IOpenApiDefinition';

import {
    Response200Schema,
    Response400Schema,
    Response401Schema,
    Response403Schema,
    Response404Schema,
    Response500Schema,
} from './Responses';

export default class ResponseDefinition {
    protected status: number;
    protected contentType: 'application/json';
    protected description: string;
    protected schema: Record<string, unknown>;

    public constructor(status: number, description: string, schema: Record<string, unknown>, contentType: 'application/json' = 'application/json') {
        this.status = status;
        this.description = description;
        this.contentType = contentType;
        this.schema = schema;
    }

    public setSchema(schema: Record<string, unknown>): void {
        this.schema = schema;
    }

    public toJSON(): IResponseContent {
        return {
            description: this.description,
            content: {
                [this.contentType]: {
                    schema: this.schema || null,
                },
            },
        };
    }
}

export const Generate200ResponseSchema = (description: string, schema?: SchemaObject): IResponseContent => {
    return (new ResponseDefinition(200, description, schema || Response200Schema, 'application/json')).toJSON();
};

export const Generate201ResponseSchema = (description: string, schema?: SchemaObject): IResponseContent => {
    return (new ResponseDefinition(201, description, schema || Response200Schema, 'application/json')).toJSON();
};

export const Generate400ResponseSchema = (description: string): IResponseContent => {
    return (new ResponseDefinition(400, description, Response400Schema, 'application/json')).toJSON();
};

export const Generate401ResponseSchema = (description: string): IResponseContent => {
    return (new ResponseDefinition(401, description, Response401Schema, 'application/json')).toJSON();
};

export const Generate403ResponseSchema = (description: string): IResponseContent => {
    return (new ResponseDefinition(403, description, Response403Schema, 'application/json')).toJSON();
};

export const Generate404ResponseSchema = (description: string): IResponseContent => {
    return (new ResponseDefinition(404, description, Response404Schema, 'application/json')).toJSON();
};

export const Generate500ResponseSchema = (description: string): IResponseContent => {
    return (new ResponseDefinition(500, description, Response500Schema, 'application/json')).toJSON();
};
