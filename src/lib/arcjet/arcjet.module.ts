import {
  ArcjetGuard,
  ArcjetModule,
  fixedWindow,
  shield,
  tokenBucket,
} from '@arcjet/nest';
import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';

type ArcjetMode = 'LIVE' | 'DRY_RUN';

function getArcjetMode(configService: ConfigService): ArcjetMode {
  return configService.get<string>('ARCJET_MODE') === 'LIVE'
    ? 'LIVE'
    : 'DRY_RUN';
}

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ArcjetModule.forRootAsync({
      isGlobal: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const mode = getArcjetMode(configService);

        return {
          key: configService.getOrThrow<string>('ARCJET_KEY'),
          rules: [
            shield({ mode }),
            tokenBucket({
              mode,
              refillRate: 10,
              interval: '1m',
              capacity: 20,
            }),
            fixedWindow({
              mode,
              window: '60s',
              max: 10,
            }),
          ],
        };
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ArcjetGuard,
    },
  ],
  exports: [ArcjetModule],
})
export class ArcjetSecurityModule {}
