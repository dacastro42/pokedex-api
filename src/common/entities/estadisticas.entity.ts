import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pokemon } from "./pokemon.entity";

@Entity("estadisticas")
export class Estadistica {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "hp" })
  hp: number;

  @Column({ name: "ataque" })
  ataque: number;

  @Column({ name: "defensa" })
  defensa: number;

  @Column({ name: "velocidad" })
  velocidad: number;

  @Column({ name: "ataque_especial" })
  ataqueEspecial: number;

  @Column({ name: "defensa_especial" })
  defensaEspecial: number;

  @Column({ name: "pokemon_id" })
  pokemonId: number;

  @ManyToOne(() => Pokemon, (pokemon) => pokemon.estadisticas)
  @JoinColumn({ name: "pokemon_id" })
  pokemon: Pokemon;
}
