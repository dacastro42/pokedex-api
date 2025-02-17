import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import * as Entities from "./common/entities";
import { PokemonModule } from "./pokemon/pokemon.module";
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      entities: [...Object.values(Entities)],
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      synchronize: true, // Solo para desarrollo
    }),
    PokemonModule,
  ],
})
export class AppModule {}
