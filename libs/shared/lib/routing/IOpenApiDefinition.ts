import { SchemaObject } from 'ajv';

interface ISchemaBody {
    schema: SchemaObject;
}

export interface IRequestResponseContent {
    content: {
        'application/json'?: ISchemaBody;
        'application/octet-stream'?: ISchemaBody;
        'application/x-www-form-urlencoded'?: ISchemaBody;
    };
}

export interface IResponseContent extends IRequestResponseContent {
    description: string;
}

export interface IParam {
    in: 'query' | 'path' | 'header' | 'cookie';
    name: string;
    description: string;
    required: boolean;
    schema: SchemaObject;
}

export interface IOpenApiDefinition {
    operationId: string;
    tags: string[];
    summary: string;
    description: string;
    parameters: IParam[];
    requestBody?: IRequestResponseContent;
    responses: {
        [x: number]: IResponseContent;
    };
}
