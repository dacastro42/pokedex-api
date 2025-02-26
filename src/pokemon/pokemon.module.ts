import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PokemonService } from "./pokemon.service";
import { PokemonController } from "./pokemon.controller";
import { Pokemon } from "../common/entities/pokemon.entity";
import { Habilidad } from "src/common/entities";
import { Elemento } from "src/common/entities/elemento.entity"; 
import { ElementoService } from "src/elemento/elemento.service";
import { ElementoModule } from "src/elemento/elemento.module";

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, Habilidad, Elemento]), ElementoModule], 
  controllers: [PokemonController],
  providers: [PokemonService, ElementoService],
})
export class PokemonModule {}
