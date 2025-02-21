import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ElementoService } from './elemento.service';
import { CreateElementoDto } from './dto/create-elemento.dto';
import { UpdateElementoDto } from './dto/update-elemento.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Elemento } from 'src/common/entities/elemento.entity';

@ApiTags('elementos') // Categoriza en Swagger
@Controller('elementos')
export class ElementoController {
  constructor(private readonly elementoService: ElementoService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo Elemento' })
  @ApiResponse({ status: 201, description: 'Elemento creado exitosamente.', type: Elemento })
  create(@Body() createElementoDto: CreateElementoDto) {
    return this.elementoService.create(createElementoDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los Elementos' })
  @ApiResponse({ status: 200, description: 'Lista de todos los elementos.', type: [Elemento] })
  findAll() {
    return this.elementoService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un Elemento por ID' })
  @ApiResponse({ status: 200, description: 'Datos del Elemento.', type: Elemento })
  @ApiResponse({ status: 404, description: 'Elemento no encontrado.' })
  findOne(@Param('id') id: string) {
    return this.elementoService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un Elemento por ID' })
  @ApiResponse({ status: 200, description: 'Elemento actualizado correctamente.', type: Elemento })
  update(@Param('id') id: string, @Body() updateElementoDto: UpdateElementoDto) {
    return this.elementoService.update(+id, updateElementoDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un Elemento por ID' })
  @ApiResponse({ status: 200, description: 'Elemento eliminado exitosamente.' })
  remove(@Param('id') id: string) {
    return this.elementoService.remove(+id);
  }
}
