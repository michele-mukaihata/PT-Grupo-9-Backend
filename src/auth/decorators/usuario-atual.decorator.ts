import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UsuarioPayLoad } from '../types/UsuarioPayLoad';

export const UsuarioAtual = createParamDecorator(
    (data: keyof UsuarioPayLoad | undefined, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest();
        return data ? request.user[data] : request.user;
    },
);