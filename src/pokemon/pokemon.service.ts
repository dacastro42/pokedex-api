import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreatePokemonDto } from "./dto/create-pokemon.dto";
import { UpdatePokemonDto } from "./dto/update-pokemon.dto";
import { Habilidad, Pokemon, Elemento } from "src/common/entities";
import { ElementoService } from "src/elemento/elemento.service";

@Injectable()
export class PokemonService {
  constructor(
    @InjectRepository(Pokemon)
    private readonly pokemonRepository: Repository<Pokemon>,
    @InjectRepository(Habilidad)
    private readonly habilidadRepository: Repository<Habilidad>,
  
    private readonly elementoService: ElementoService 
  ) {}

  async create(dto: CreatePokemonDto): Promise<Pokemon> {
    const {
      habilidadesNuevas,
      habilidadesExistentes,
      elementosNuevos,
      elementosExistentes,
    } = dto; //const { habilidades } = dto;

    let habilidadesRelacionadas: Habilidad[] = [];
    let elementosRelacionados: Elemento[] = [];

    // Si hay habilidades existentes, obtenerlas de la BD
    if (habilidadesExistentes && habilidadesExistentes.length > 0) {
      habilidadesRelacionadas = await this.habilidadRepository.find({
        where: { id: In(habilidadesExistentes) },
      });
    }

    // Si hay habilidades nuevas, crearlas y agregarlas
    if (habilidadesNuevas && habilidadesNuevas.length > 0) {
      const nuevasHabilidades =
        this.habilidadRepository.create(habilidadesNuevas);
      const habilidadesGuardadas =
        await this.habilidadRepository.save(nuevasHabilidades);
      habilidadesRelacionadas = [
        ...habilidadesRelacionadas,
        ...habilidadesGuardadas,
      ];
    }

    // Obtener elementos nuevos o existentes usando el servicio de elementos
    elementosRelacionados = await this.elementoService.createOrFindElements(elementosNuevos, elementosExistentes);


    // Crear el Pokémon con las habilidades o elementos relacionados
    const pokemon = this.pokemonRepository.create({
      ...dto,
      habilidades: habilidadesRelacionadas,
      elementos: elementosRelacionados,
    });

    return this.pokemonRepository.save(pokemon);

    //if (habilidades) {
    // dto.habilidades = this.habilidadRepository.create(habilidades);
    //}

    //const pokemon = this.pokemonRepository.create(dto);
    //return this.pokemonRepository.save(pokemon);
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
