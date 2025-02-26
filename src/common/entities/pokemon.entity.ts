import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  OneToMany,
  ManyToMany,
  JoinTable,
} from "typeorm";
import { Generaciones } from "./generaciones.entity";
import { Estadistica } from "./estadisticas.entity";
import { Evolucion } from "./evoluciones.entity";
import { Habilidad } from "./habilidades.entity";
import { PokemonElemento } from "./pokemon-elementos.entity";
import { Elemento } from "./elemento.entity";

@Entity("pokemons")
export class Pokemon {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  numero: number;

  @Column({ length: 50 })
  nombre: string;

  @Column({ name: "nombre_japones", length: 50, nullable: true })
  nombreJapones: string;

  @Column({ name: "generacion_id" })
  generacionId: number;

  @ManyToOne(() => Generaciones, (generacion) => generacion.id, { eager: true })
  @JoinColumn({ name: "generacion_id" })
  generacion: Generaciones;

  @OneToMany(() => Estadistica, (estadistica) => estadistica.pokemon)
  estadisticas: Estadistica[];

  @OneToMany(() => Evolucion, (evolucion) => evolucion.pokemon)
  evoluciones: Evolucion[];

  @ManyToMany(() => Habilidad, (habilidad) => habilidad.pokemons, {
    cascade: ["insert", "update"],
  })
  @JoinTable({
    name: "pokemons_habilidades",
    joinColumn: { name: "pokemon_id", referencedColumnName: "id" }, // JoinColum es this
    inverseJoinColumn: { name: "habilidad_id", referencedColumnName: "id" }, // inverseJoinColumn es la tabla de la relacion
  })
  habilidades: Habilidad[];

  // 🔥 Agregamos la relación correcta con `Elementos`
  @ManyToMany(() => Elemento, (elemento) => elemento.pokemonElemento, {
    cascade: ["insert", "update"],
  })
  @JoinTable({
    name: "pokemons_elementos", // Nombre de la tabla intermedia
    joinColumn: { name: "pokemon_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "elemento_id", referencedColumnName: "id" },
  })
  elementos: Elemento[];

  @OneToMany(
    () => PokemonElemento,
    (pokemonElemento) => pokemonElemento.pokemon
  )
  pokemonElemento: PokemonElemento[];
}
