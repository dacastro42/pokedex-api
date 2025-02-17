import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Elemento } from "./elemento.entity";

@Entity("interacciones")
export class Interaccion {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne(() => Elemento, (elemento) => elemento.interaccionesOrigen, {
    nullable: false,
  })
  @JoinColumn({ name: "elemento_origen_id" })
  elementoOrigen: Elemento;

  @ManyToOne(() => Elemento, (elemento) => elemento.interaccionesDestino, {
    nullable: false,
  })
  @JoinColumn({ name: "elemento_destino_id" })
  elementoDestino: Elemento;

  @Column()
  efecto: string;
}
