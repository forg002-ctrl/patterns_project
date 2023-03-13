import swaggerJsDoc, { Information, Options } from 'swagger-jsdoc';

export class Documentation {
    private openapi: string = '3.0.1';
    private paths: Record<string, Record<string, any>> = {};
    private definitions: Record<string, Record<string, any>> = {};
    private schemes: Array<string> = ['https'];
    private produces: Array<string> = ['application/json'];
    private apis: Array<string> = [];
    private basePath: string = '/';
    private info: Information = {
        description: '',
        title: '',
        version: '',
    };

    public constructor(apiInformation: Information) {
        this.info = apiInformation;
    }

    public addPath(route: string, path: Record<string, any>): void {
        if (!this.paths[route]) {
            this.paths[route] = {};
        }
        Object.assign(this.paths[route], path);
    }

    public addDefinition(name: string, definition: Record<string, any>): void {
        this.definitions[name] = definition;
    }

    public getOptions(): Options {
        return {
            swaggerDefinition: {
                openapi: this.openapi,
                info: this.info,
                schemes: this.schemes,
                basePath: this.basePath,
                produces: this.produces,
                paths: this.paths,
                definitions: this.definitions,
            },
            apis: this.apis,
        };
    }

    public getJsDoc(): Record<string, unknown> {
        return swaggerJsDoc(this.getOptions()) as Record<string, unknown>;
    }
}
