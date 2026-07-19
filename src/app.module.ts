import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArcjetSecurityModule } from './lib/arcjet/arcjet.module';

@Module({
  imports: [ArcjetSecurityModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
