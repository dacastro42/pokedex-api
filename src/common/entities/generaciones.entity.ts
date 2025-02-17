import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("generaciones")
export class Generaciones {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50 })
  nombre: string;
}
