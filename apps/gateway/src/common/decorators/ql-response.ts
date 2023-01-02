import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const QLResponse = createParamDecorator<unknown, unknown, Response>(
    (data: unknown, context: ExecutionContext) => {
        return context.getArgByIndex(2).res;
    },
);
