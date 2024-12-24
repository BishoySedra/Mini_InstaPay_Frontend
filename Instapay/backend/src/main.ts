/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

dotenv.config();  // Load the environment variables from the .env file

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enabling CORS for your frontend
  app.enableCors({
    origin: 'http://localhost:5173', // The URL of your frontend (Vite or React app)
    methods: 'GET,POST,PUT,DELETE,OPTIONS,PATCH',
    allowedHeaders: 'Content-Type, Authorization',
    preflightContinue: false,  // Handle preflight requests automatically
  });

  const config = new DocumentBuilder()
    .setTitle('Mini Instapay')
    .setVersion('1.0')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true, // Automatically transform input types based on DTO
    }),
  );

  await app.listen(3000);
}

bootstrap();
