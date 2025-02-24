import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import * as Entities from "./common/entities";
import { PokemonModule } from "./pokemon/pokemon.module";
import { ElementoModule } from './elemento/elemento.module';
import { Elemento } from './common/entities/elemento.entity';
import { HabilidadModule } from './habilidad/habilidad.module';
import { Habilidad } from './common/entities/habilidades.entity';
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
    ElementoModule,
    HabilidadModule,
  ],
})
export class AppModule {}
