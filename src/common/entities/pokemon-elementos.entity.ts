import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pokemon } from "./pokemon.entity";
import { Elemento } from "./elemento.entity";

@Entity("pokemons_elementos")
export class PokemonElemento {
  
  //@PrimaryGeneratedColumn("increment")
  //id: number;

  //@Column({ name: "pokemon_id", nullable: false })
 // pokemonId: number;

  //@Column({ name: "elemento_id", nullable: false })
  //elementoId: number;
  @PrimaryColumn({ name: "pokemon_id" }) 
  pokemonId: number;

  @PrimaryColumn({ name: "elemento_id" }) 
  elementoId: number;
  @ManyToOne(() => Pokemon, (pokemon) => pokemon.pokemonElemento)
  @JoinColumn({ name: "pokemon_id" })
  pokemon: Pokemon;

  @ManyToOne(() => Elemento, (elemento) => elemento.pokemonElemento)
  @JoinColumn({ name: "elemento_id" })
  elemento: Elemento;
}
