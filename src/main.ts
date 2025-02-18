import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe());

  // Configurar Swagger
  const config = new DocumentBuilder()
    .setTitle("Pokedex API")
    .setDescription("API para gestionar Pokémon con Nest.js y MySQL")
    .setVersion("1.0")
    .addTag("pokemon") // Sección específica para Pokémon
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
