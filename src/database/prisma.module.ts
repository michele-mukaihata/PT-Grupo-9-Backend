import { PrismaService } from "./prisma.service";
import { Global, Module } from "@nestjs/common";


// isso são decorators
@Global()
@Module({
    providers: [PrismaService],
    exports: [PrismaService],
})

//isso cria o prisma module
export class PrismaModule{};
