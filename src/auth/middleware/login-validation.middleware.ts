import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoginRequestBody } from '../dto/loginRequestBody.dto';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer'; // 1. IMPORTE O 'plainToClass'

@Injectable()
export class LoginValidationMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        const body = req.body;

        const loginRequestBody = plainToClass(LoginRequestBody, body);

        const validations = await validate(loginRequestBody);

        if (validations.length) {
        throw new BadRequestException(
            validations.reduce((acc: string[], curr) => {
            if (curr.constraints) {
                return [...acc, ...Object.values(curr.constraints)];
            }
            return acc;
            }, []),
        );
        }

        next();
    }
}