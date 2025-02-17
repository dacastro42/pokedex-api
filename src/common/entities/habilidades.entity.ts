import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { Pokemon } from "./pokemon.entity";

@Entity("habilidades")
export class Habilidad {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ nullable: false })
  nombre: string;

  @Column({ type: "text" })
  descripcion: string;

  @ManyToMany(() => Pokemon, (pokemon) => pokemon.habilidades)
  pokemons: Pokemon[];
}
