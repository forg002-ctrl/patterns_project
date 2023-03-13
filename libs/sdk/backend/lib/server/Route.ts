import moment from 'moment';

import { NextFunction, Request, Response } from 'express';
import { SchemaObject } from 'ajv';

import { IServer, Server } from './../Server';

import { IRouteDescription } from './../../../../shared/lib/routing/IRouteDescription';
import { GetAjv } from './../../../../shared/lib/ajv/Ajv';
import { UserInputError } from './../../../../shared/lib/error/UserInputError';

type ALLOWED_HTTP_METHODS = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE';
export interface IParam {
    in: 'query' | 'path' | 'header' | 'cookie';
    name: string;
    description: string;
    required: boolean;
    schema: SchemaObject;
}

export interface IRouteOptions {
    description: IRouteDescription;
}

export interface IRoute {
    getRoles(): string[];
    getMethod(): string;
    getRoute(): string;
    register(server: IServer): Promise<void>;
}

export abstract class Route implements IRoute {
    protected tags: string[];
    protected method: ALLOWED_HTTP_METHODS;
    protected namespace: string;
    protected route: string;
    protected routeDescription: IRouteDescription;
    protected middlewares: Array<any> = [];

    protected responses: Record<string, unknown> = {};

    public constructor(options: IRouteOptions) {
        this.routeDescription = options.description;

        if (this.routeDescription.schema.requestBody) {
            this.enableRequestValidatorMiddleware();
        }
    }

    public get require_auth(): boolean {
        return Array.isArray(this.routeDescription.roles) && this.routeDescription.roles.length > 0;
    }

    protected getParams<T>(req: Request): T {
        let params = req.params as unknown as T;
        if (!params) {
            throw new UserInputError('No path params');
        }

        return params;
    }

    protected getQuery<T>(req: Request): T {
        let params = req.query as unknown as T;
        if (!params) {
            throw new UserInputError('No query params');
        }

        return params;
    }

    protected getBody<T>(req: Request): T {
        let body = req.body as unknown as T;
        if (!body) {
            throw new UserInputError('No request body');
        }

        return body;
    }
    
    public getRoles(): string[] {
        return this.routeDescription.roles;
    }

    public getMethod(): string {
        return this.method;
    }

    public getDescription(): string {
        return this.routeDescription.schema.description;
    }

    public getRoute(): string {
        return this.routeDescription.route;
    }

    public async execute(req: Request, res: Response): Promise<void> {
        try {
            await this.main(req, res);
        } catch (err) {
            console.log(err);
            try {
                res.status(400);
                res.json({
                    errors: [ err.message ],
                });
            } catch (err) {
                console.log('[FAILED][RESPONSE]', err.message);
            }
        } finally {
            console.log('[' + moment().format('YYYY-MM-DD HH:mm:ss') + '][' + this.method + '][' + this.constructor.name + ']', res.statusCode, res.statusMessage);
        }
    }

    public getRequestParams(): Array<IParam> {
        return [];
    }

    public getRequestSchema(): SchemaObject | null {
        return this.routeDescription.requestBodySchema || null as any;
    }

    public getRequestContentType(): string {
        return 'application/json';
    }

    public abstract register(server: Server): Promise<void>;
    public abstract main(req: Request, res: Response): Promise<void>;

    public getSwaggerDescription(): Record<string, unknown> {
        return { [this.method.toLowerCase()]: this.routeDescription.schema };
    }

    protected enableRequestValidatorMiddleware(): void {
        this.middlewares.push(async (req: Request, res: Response, next: NextFunction): Promise<void> => {
            let routeSchema = this.getRequestSchema() as SchemaObject;
            let schema = GetAjv().compile(routeSchema);
            if (!schema) {
                console.log(`Invalid schema for route ${this.getRoute()}`);
                res.sendStatus(500);

                return;
            } else if (!schema(await req.body)) {
                let errors = (schema.errors || []).map(s => s.message || (s.propertyName ? `Invalid property ${s.propertyName}` : 'Validation error'));
                res.status(400);
                res.json({
                    errors: errors,
                });

                return;
            }

            next();
        });
    }
}
