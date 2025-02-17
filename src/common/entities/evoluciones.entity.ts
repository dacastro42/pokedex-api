import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Pokemon } from "./pokemon.entity";

@Entity("evoluciones")
export class Evolucion {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ name: "pokemon_id" })
  pokemonId: number;
  @ManyToOne(() => Pokemon, (pokemon) => pokemon.id)
  @JoinColumn({ name: "pokemon_id" })
  pokemon: Pokemon;

  @ManyToOne(() => Evolucion, (evolucion) => evolucion.evolucionesAnteriores, {
    nullable: true,
  })
  @JoinColumn({ name: "evolucion_anterior_id" })
  evolucionAnterior?: Evolucion;

  @OneToMany(() => Evolucion, (evolucion) => evolucion.evolucionAnterior)
  evolucionesAnteriores: Evolucion;

  @Column({ name: "nivel_evolucion" })
  nivelEvolucion: number;

  @Column()
  metodo: string;
}
