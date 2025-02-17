import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Pokemon } from "./entities/pokemon.entity";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>
  ) {}

  async create(createPokemonDto: CreatePokemonDto): Promise<Pokemon> {
    const pokemon = this.pokemonRepository.create(createPokemonDto);
    return this.pokemonRepository.save(pokemon);
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find();
  }

  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { idPokemons: id },
    });
    if (!pokemon) {
      throw new NotFoundException(`Pokemon con id ${id} no encontrado`);
    }
    return pokemon;
  }

  async update(
    id: number,
    updatePokemonDto: UpdatePokemonDto
  ): Promise<Pokemon> {
    await this.findOne(id);
    await this.pokemonRepository.update(id, updatePokemonDto);
    return this.pokemonRepository.findOne({
      where: { idPokemons: id },
    }) as Promise<Pokemon>;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.pokemonRepository.delete(id);
  }
}
