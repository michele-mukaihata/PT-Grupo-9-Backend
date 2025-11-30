import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UsuarioService } from 'src/usuarios/usuarios.service';
import { UsuarioPayLoad } from './types/UsuarioPayLoad';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsuarioToken } from './types/UsuarioToken';
import { LoginRequestBody } from './dto/loginRequestBody.dto';

@Injectable()
  export class AuthService {
        constructor(private readonly userService: UsuarioService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
    ) {}
    
    async login(loginRequestBody: LoginRequestBody): Promise<UsuarioToken> {

        const isUserValid = await this.validateUser(loginRequestBody.email, loginRequestBody.senha);

        if (!isUserValid) {
            throw new UnauthorizedException('Usuário ou senha incorretos');
        }
        
        const payload: UsuarioPayLoad = {
            sub: isUserValid.id.toString(),
            email: loginRequestBody.email,
            username: isUserValid.username,
        };

        const jwtSecret = this.configService.get<string>('JWT_SECRET');

        const jwtToken = await this.jwtService.signAsync(payload, {expiresIn: '1d', secret: jwtSecret});

        return {
            access_token: jwtToken,
        };
    }

    async validateUser(email: string, senha: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            const isPasswordValid = await bcrypt.compare(senha, user.senha_hash);

            if (isPasswordValid) {
                return {
                    ...user,
                    senha: undefined,
                };
            } 
        } 

        return null;
    }
}