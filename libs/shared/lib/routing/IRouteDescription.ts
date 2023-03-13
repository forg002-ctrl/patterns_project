import { SchemaObject } from 'ajv';
import { IOpenApiDefinition } from './IOpenApiDefinition';

export interface IRouteDescription {
    route: string;
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    requestBodySchema?: SchemaObject;
    schema: IOpenApiDefinition;
    roles: string[];
}
