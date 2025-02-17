import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("pokemons") // Nombre exacto de la tabla en la BD
export class Pokemon {
  @PrimaryGeneratedColumn()
  idPokemons: number; // Clave primaria (Auto-incremental)

  @Column()
  numeropokemon: number; // Número en la Pokédex

  @Column({ length: 50 })
  nombrePokemon: string; // Nombre del Pokémon

  @Column({ type: "longblob", nullable: true })
  iconoPokemon: Buffer; // Imagen en formato BLOB

  @Column({ length: 50, nullable: true })
  nombrePokemonJapones: string; // Nombre en japonés

  @Column()
  idgeneracionf: number; // ID de la generación
}
