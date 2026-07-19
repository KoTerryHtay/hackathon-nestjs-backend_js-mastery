import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArcjetSecurityModule } from './lib/arcjet/arcjet.module';
import { PrismaModule } from './lib/database/prisma.module';

@Module({
  imports: [ArcjetSecurityModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
