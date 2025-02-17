import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Interaccion } from "./interacciones.entity";
import { PokemonElemento } from "./pokemon-elementos.entity";
import { Movimiento } from "./movimientos.entity";

@Entity("elementos")
export class Elemento {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  color: string;

  @Column({ name: "efecto_clima", nullable: true })
  efectoClima: string;

  @OneToMany(() => Interaccion, (interaccion) => interaccion.elementoOrigen)
  interaccionesOrigen: Interaccion[];

  @OneToMany(() => Interaccion, (interaccion) => interaccion.elementoDestino)
  interaccionesDestino: Interaccion[];

  @OneToMany(
    () => PokemonElemento,
    (pokemonElemento) => pokemonElemento.elemento
  )
  pokemonElemento: PokemonElemento[];

  @OneToMany(() => Movimiento, (movimiento) => movimiento.elemento)
  elemento: Movimiento[];
}
