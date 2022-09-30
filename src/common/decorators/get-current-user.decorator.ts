import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetCurrentUser = createParamDecorator(
  (data: string | undefined, context: ExecutionContext) => {
    // first argument '0' is request and second is '1' response
    const request = context.getArgByIndex(0);
    if (!data) return request.user;
    return request.user[data];
  },
);
