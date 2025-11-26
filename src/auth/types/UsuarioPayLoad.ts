export class UsuarioPayLoad {
    sub: string; //sub (subject) = Entidade à quem o token pertence, normalmente o ID do usuário;
    email: string;
    username: string;
    iat?: number; //iat (issued at) = Timestamp de quando o token foi criado;
    exp?: number; //exp (expiration) = Timestamp de quando o token irá expirar;
}