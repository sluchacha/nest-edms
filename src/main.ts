import { WrapResponseInterceptor } from '@common/interceptors/wrap-response.interceptor';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as csrf from 'csrf';
import * as helmet from 'helmet';
import * as dotenv from 'dotenv';
import { AppConfiguration, appConfiguration } from './utils-config';

function configureSwagger(
  appConfig: AppConfiguration,
  app: INestApplication,
  globalPrefix: string,
) {
  const swaggerDocOptions = new DocumentBuilder()
    .setTitle('EDMS API')
    .setDescription('Electronic document management system API')
    .setVersion('1.0.0')
    .addServer(appConfig.domain, 'development')
    .build();

  const swaggerDoc = SwaggerModule.createDocument(app, swaggerDocOptions);
  const swaggerUIPath = `/${globalPrefix}/docs`;
  SwaggerModule.setup(swaggerUIPath, app, swaggerDoc);
  Logger.log(
    `Swagger Docs enabled: ${appConfig.domain}${swaggerUIPath}`,
    'Nest Application',
  );
}

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const appConfig = app.get<AppConfiguration>(appConfiguration.KEY);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  configureSwagger(appConfig, app, globalPrefix);

  app.use([helmet()]);

  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      // forbidUnknownValues: true,
    }),
  );

  // app.useGlobalInterceptors(new WrapResponseInterceptor());

  await app.listen(appConfig.port, () => {
    Logger.log(`Listening on: ${appConfig.domain}/${globalPrefix}`);
  });
}
bootstrap();
