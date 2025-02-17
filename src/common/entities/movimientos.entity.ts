import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Elemento } from "./elemento.entity";

@Entity("movimientos")
export class Movimiento {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  nombre: string;

  @Column({ type: "int" })
  potencia: number;

  @Column({ type: "int" })
  precision: number;

  @Column({ type: "int" })
  pp: number;

  @Column({ name: "elemento_id", nullable: false })
  elementoId: number;

  @ManyToOne(() => Elemento, (elemento) => elemento.id)
  @JoinColumn({ name: "elemento_id" })
  elemento: Elemento;
}
