import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Habilidad } from "src/common/entities/habilidades.entity"; // Corregido
import { HabilidadService } from "./habilidad.service";
import { HabilidadController } from "./habilidad.controller";
import { Pokemon } from "src/common/entities/pokemon.entity"; // Corregido

@Module({
  imports: [TypeOrmModule.forFeature([Habilidad, Pokemon])], // Asegurar que Pokemon está registrado
  controllers: [HabilidadController],
  providers: [HabilidadService],
  exports: [HabilidadService],
})
export class HabilidadModule {}

