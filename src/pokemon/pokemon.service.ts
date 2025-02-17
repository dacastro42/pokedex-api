import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { Habilidad, Pokemon } from "src/common/entities";

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Habilidad)
    private readonly habilidadRepository: Repository<Habilidad>
  ) {}

  async create(dto: CreatePokemonDto): Promise<Pokemon> {
    const { habilidades } = dto;

    if (habilidades) {
      dto.habilidades = this.habilidadRepository.create(habilidades);
    }

    const pokemon = this.pokemonRepository.create(dto);
    return this.pokemonRepository.save(pokemon);
  }

  async findAll(): Promise<Pokemon[]> {
    return this.pokemonRepository.find({
      relations: { habilidades: true, evoluciones: true, estadisticas: true },
    });
  }

  async findOne(id: number): Promise<Pokemon> {
    const pokemon = await this.pokemonRepository.findOne({
      where: { id: id },
      relations: { habilidades: true, evoluciones: true, estadisticas: true },
    });
    if (!pokemon) {
      throw new NotFoundException(`Pokemon con id ${id} no encontrado`);
    }
    return pokemon;
  }

  async update(id: number, dto: UpdatePokemonDto): Promise<Pokemon> {
    const currentPokemon = await this.findOne(id);
    return await this.pokemonRepository.save({ ...currentPokemon, ...dto });
  }

  async remove(id: number): Promise<void> {
    const currentPokemon = await this.findOne(id);
    await this.pokemonRepository.remove(currentPokemon);
  }
}
