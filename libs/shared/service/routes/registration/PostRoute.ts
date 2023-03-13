// import { JSONSchemaType } from 'ajv';

// import { ValidateSchema, IValidationResponse } from '../../../lib/ajv/Ajv';
// import { IOpenApiDefinition } from '../../../lib/routing/IOpenApiDefinition';
// import { IRouteDescription } from '../../../lib/routing/IRouteDescription';
// import { IResponse200 as ISuccessResponse } from '../../../lib/routing/Responses';
// import {
//     Generate200ResponseSchema,
//     Generate400ResponseSchema,
//     Generate401ResponseSchema,
//     Generate403ResponseSchema,
//     Generate500ResponseSchema,
// } from '../../../lib/routing/ResponseDefinition';


// export interface IRequestBody {
//     username: string;
//     password: string;
//     password_confirmation: string;
// }

// export interface IResponse201 extends ISuccessResponse {}

// export const RequestBodySchema: JSONSchemaType<IRequestBody> = {
//     type: 'object',
//     properties: {
//         username: {
//             type: 'string',
//             minLength: 2,
//             isNotEmpty: true,
//             errorMessage: {
//                 type: `Username must be the 'string' type`,
//                 required: `Username is required`,
//                 isNotEmpty: `Username must not be empty`,
//                 minLength: `Username size cannot be less than 2`,
//             }
//         },
//         password: {
//             type: 'string',
//             minLength: 2,
//             isNotEmpty: true,
//             errorMessage: {
//                 type: `Password must be the 'string' type`,
//                 required: `Password is required`,
//                 isNotEmpty: `Password must not be empty`,
//                 minLength: `Password size cannot be less than 2`,
//             }
//         },
//         password_confirmation: {
//             type: 'string',
//             minLength: 2,
//             isNotEmpty: true,
//             errorMessage: {
//                 type: `Password Confirmation must be the 'string' type`,
//                 required: `Password Confirmation is required`,
//                 isNotEmpty: `Password Confirmation must not be empty`,
//                 minLength: `Password Confirmation size cannot be less than 2`,
//             }
//         },
//     },
//     required: [
//         'username',
//         'password',
//         'password_confirmation',
//     ],
// };

// export const validationOfSchema = (data: IRequestBody): IValidationResponse => {
//     return ValidateSchema(RequestBodySchema, data);
// };

// export const OpenApiSpec: IOpenApiDefinition = {
//     tags: [ 'Authentication' ],
//     summary: 'POST registration of new user',
//     description: 'Registration of new user',
//     operationId: 'registration-post',
//     parameters: [],
//     requestBody: {
//         content: {
//             'application/json': {
//                 schema: RequestBodySchema,
//             },
//         },
//     },
//     responses: {
//         201: Generate200ResponseSchema('New user registered successfully'),
//         400: Generate400ResponseSchema('Bad request'),
//         401: Generate401ResponseSchema('Unauthorized'),
//         403: Generate403ResponseSchema('Forbidden'),
//         500: Generate500ResponseSchema('Internal error'),
//     },
// };

// export const routeDescription: IRouteDescription = {
//     route: '/registration',
//     method: 'POST',
//     schema: OpenApiSpec,
//     requestBodySchema: RequestBodySchema,
//     roles: [],
// };
