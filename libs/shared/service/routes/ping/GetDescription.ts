import { JSONSchemaType } from 'ajv';
import { IOpenApiDefinition } from '../../../lib/routing/IOpenApiDefinition';
import { IRouteDescription } from '../../../lib/routing/IRouteDescription';
import {
    Generate200ResponseSchema,
    Generate400ResponseSchema,
    Generate401ResponseSchema,
    Generate403ResponseSchema,
    Generate500ResponseSchema,
} from '../../../lib/routing/ResponseDefinition';

export interface IResponse200 {
    pong: string;
}

export const Response200Schema: JSONSchemaType<IResponse200> = {
    type: 'object',
    properties: {
        pong: {
            type: 'string',
            nullable: false,
        },
    },
    required: [
        'pong',
    ],
};

export const OpenApiSpec: IOpenApiDefinition = {
    tags: [ 'Ping' ],
    summary: 'System alive check',
    description: 'Return pong',
    operationId: 'get-ping',
    parameters: [],
    responses: {
        200: Generate200ResponseSchema('Pong', Response200Schema),
        400: Generate400ResponseSchema('Bad request'),
        401: Generate401ResponseSchema('Unauthorized'),
        403: Generate403ResponseSchema('Forbidden'),
        500: Generate500ResponseSchema('Internal error'),
    },
};

export const routeDescription: IRouteDescription = {
    route: '/ping',
    method: 'GET',
    schema: OpenApiSpec,
    roles: ['defaultUser'],
};
