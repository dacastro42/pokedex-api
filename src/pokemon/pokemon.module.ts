import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PokemonService } from "./pokemon.service";
import { PokemonController } from "./pokemon.controller";
import { Pokemon } from "../common/entities/pokemon.entity";
import { Habilidad } from "src/common/entities";

@Module({
  imports: [TypeOrmModule.forFeature([Pokemon, Habilidad])],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
