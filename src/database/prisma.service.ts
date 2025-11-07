import { Injectable, OnModuleInit} from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
// o prismaservice vai extender o prismacliente, conceito de herança
// o prismaservice vai estar pegando as características do client
export class PrismaService extends PrismaClient implements OnModuleInit{
  async onModuleInit() {
    await this.$connect();
  }
};