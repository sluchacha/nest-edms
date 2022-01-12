import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards';
import { LoggingMiddleware } from './middleware';

@Module({
  // providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard }],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    //Add middleware
    // consumer.apply(LoggingMiddleware).forRoutes('*');
  }
}
