import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { Pokemon } from "./pokemon/entities/pokemon.entity";
import { PokemonModule } from "./pokemon/pokemon.module";
@Module({
  imports: [
    ConfigModule.forRoot(), // Cargar variables de entorno
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Pokemon],
      synchronize: true, // Solo para desarrollo
    }),
    PokemonModule,
  ],
})
export class AppModule {}
