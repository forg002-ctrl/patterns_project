import Ajv, { JSONSchemaType } from 'ajv';
import addFormats from 'ajv-formats';
import ajvErrors from 'ajv-errors';

let ajv: Ajv | null;

export interface IValidationResponse {
    errors: string[];
}

export const GetAjv = (): Ajv => {
    if (!ajv) {
        ajv = new Ajv({ allErrors: true, $data: true });
        InitAjv(ajv);
    }

    return ajv;
};

export const InitAjv = (ajv: Ajv): void => {
    ajv.addKeyword({
        keyword: 'isNotEmpty',
        type: 'string',
        validate: (schema: any, data: any) => {
            if (typeof data === 'string') {
                return data.trim() !== '';
            }

            return true;
        },
        errors: false,
    });

    addFormats(ajv);
    ajvErrors(ajv);
};

export const ValidateSchema = <T = Record<string, unknown>>(schema: JSONSchemaType<T>, data: T): IValidationResponse => {
    let ajv = GetAjv();
    let res = ajv.validate(schema, data);
    if (!res) {
        let errors = (ajv.errors || []).map(s => s.message || (s.propertyName ? `Invalid property ${s.propertyName}` : 'Validation error'));

        return { errors: errors };
    }

    return { errors: [] };
};
