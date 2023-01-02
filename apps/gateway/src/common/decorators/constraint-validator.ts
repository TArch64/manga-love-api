import { Directive } from '@nestjs/graphql';

type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
type Decorator = MethodDecorator & PropertyDecorator & ClassDecorator;

export enum ConstraintFormat {
    BYTE = 'byte',
    DATE_TIME = 'date-time',
    DATE = 'date',
    EMAIL = 'email',
    IP_V4 = 'ipv4',
    IP_V6 = 'ipv6',
    URI = 'uri',
    UUID = 'uuid',
}

interface ConstraintOptions {
    minLength: number;
    maxLength: number;
    startsWith: string;
    endsWith: string;
    contains: string;
    notContains: string;
    pattern: string;
    format: ConstraintFormat;
    min: number;
    max: number;
    exclusiveMin: number;
    exclusiveMax: number;
    multipleOf: number;
    minItems: number;
    maxItems: number;
}

export const ConstraintValidator = (options: AtLeastOne<ConstraintOptions>): Decorator => {
    const args = Object.entries(options).map(([name, value]) => {
        const formattedValue = typeof value === 'string' ? `"${value}"` : value;
        return `${name}: ${formattedValue}`;
    });
    return Directive(`@constraint(${args.join(', ')})`);
};
