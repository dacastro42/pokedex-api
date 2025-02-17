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

@Controller("pokemon")
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() dto: CreatePokemonDto) {
    return this.pokemonService.create(dto);
  }

  @Get()
  findAll() {
    return this.pokemonService.findAll();
  }

  @Get(":pokemonId")
  findOne(@Param("pokemonId", ParseIntPipe) id: number) {
    return this.pokemonService.findOne(id);
  }

  @Patch(":pokemonId")
  update(
    @Param("pokemonId", ParseIntPipe) id: number,
    @Body() updatePokemonDto: UpdatePokemonDto
  ) {
    return this.pokemonService.update(id, updatePokemonDto);
  }

  @Delete(":pokemonId")
  remove(@Param("pokemonId", ParseIntPipe) id: number) {
    return this.pokemonService.remove(id);
  }
}
