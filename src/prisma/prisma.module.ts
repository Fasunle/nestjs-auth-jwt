import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global()   // export PrismaService to the global context. All module can use it
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
