import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";

import { Users } from '../users/entities/user.entity'; 

export interface AuthenticatedRequest extends Request {
    user?: Partial<Users>;
}

@Injectable()
export class UserGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest<AuthenticatedRequest>(); 

        const authHeader = req.headers.authorization;

        if (!authHeader) {
            throw new UnauthorizedException("User unauthorized.");
        }

        const [ bearer, token ] = authHeader.split(' ');

        if (bearer !== "Bearer" || !token) {
            throw new UnauthorizedException("User unauthorized");
        }

        try {
            const user: Partial<Users> = await this.jwtService.verify(token, {
                secret: process.env.ACCES_TOKEN_KEY || 'MyAccesVery',
            });

            if (!user) {
                throw new UnauthorizedException("Invalid token provided");
            }

            req.user = user;
            
            return true;
        } catch (error) {
            throw new UnauthorizedException("Invalid token provided");
        }
    }
}