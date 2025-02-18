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
import { PokemonService } from "./pokemon.service";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Pokemon } from "src/common/entities";

@ApiTags('pokemon')
@Controller("pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo Pokémon' })
  @ApiResponse({ status: 201, description: 'Pokémon creado exitosamente.', type: Pokemon })
  create(@Body() dto: CreatePokemonDto) {
    return this.pokemonService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los Pokémon' })
  @ApiResponse({ status: 200, description: 'Lista de todos los Pokémon.', type: [Pokemon] })
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(":pokemonId")
  @ApiOperation({ summary: 'Obtener un Pokémon por ID' })
  @ApiResponse({ status: 200, description: 'Datos del Pokémon.', type: Pokemon })
  @ApiResponse({ status: 404, description: 'Pokémon no encontrado.' })
  findOne(@Param("pokemonId", ParseIntPipe) id: number) {
    return this.pokemonService.findOne(id);
  }

  @Patch(":pokemonId")
  @ApiOperation({ summary: 'Actualizar un Pokémon por ID' })
  @ApiResponse({ status: 200, description: 'Pokémon actualizado correctamente.', type: Pokemon })
  update(
    @Param("pokemonId", ParseIntPipe) id: number,
    @Body() updatePokemonDto: UpdatePokemonDto
  ) {
    return this.pokemonService.update(id, updatePokemonDto);
  }

  @Delete(":pokemonId")
  @ApiOperation({ summary: 'Eliminar un Pokémon por ID' })
  @ApiResponse({ status: 200, description: 'Pokémon eliminado exitosamente.' })
  remove(@Param("pokemonId", ParseIntPipe) id: number) {
    return this.pokemonService.remove(id);
  }
}
