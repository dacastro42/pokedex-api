import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from "@nestjs/common";

import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Habilidad } from "src/common/entities/habilidades.entity";
import { HabilidadService } from "./habilidad.service";
import { CreateHabilidadDto } from "./dto/create-habilidad.dto";
import { UpdateHabilidadDto } from "./dto/update-habilidad.dto";

@ApiTags('habilidades')
@Controller("habilidades")
export class HabilidadController {
  constructor(private readonly habilidadService: HabilidadService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva habilidad' })
  @ApiResponse({ status: 201, description: 'Habilidad creada exitosamente.', type: Habilidad })
  create(@Body() dto: CreateHabilidadDto) {
    return this.habilidadService .create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las habilidades' })
  @ApiResponse({ status: 200, description: 'Lista de todas las habilidades.', type: [Habilidad] })
  findAll() {
    return this.habilidadService.findAll();
  }

  @Get(":habilidadId")
  @ApiOperation({ summary: 'Obtener una habilidad por ID' })
  @ApiResponse({ status: 200, description: 'Datos de la habilidad.', type: Habilidad })
  @ApiResponse({ status: 404, description: 'habilidad no encontrada.' })
  findOne(@Param("habilidadId", ParseIntPipe) id: number) {
    return this.habilidadService.findOne(id);
  }

  @Patch(":habilidadId")
  @ApiOperation({ summary: 'Actualizar una habilidad por ID' })
  @ApiResponse({ status: 200, description: 'habilidad actualizada correctamente.', type: Habilidad })
  update(
    @Param("habilidadId", ParseIntPipe) id: number,
    @Body() updateHabilidadDto: UpdateHabilidadDto
  ) {
    return this.habilidadService.update(id, updateHabilidadDto);
  }

  @Delete(":habilidadId")
  @ApiOperation({ summary: 'Eliminar una habilidad por ID' })
  @ApiResponse({ status: 200, description: 'Habilidad eliminada exitosamente.' })
  remove(@Param("habilidadId", ParseIntPipe) id: number) {
    return this.habilidadService.remove(id);
  }
}
