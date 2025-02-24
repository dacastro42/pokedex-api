import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Habilidad } from "src/common/entities/habilidades.entity";
import { Pokemon } from "src/common/entities/pokemon.entity";
import { CreateHabilidadDto } from "./dto/create-habilidad.dto";
import { UpdateHabilidadDto } from "./dto/update-habilidad.dto";

@Injectable()
export class HabilidadService {
  constructor(
    @InjectRepository(Habilidad)
    private readonly habilidadRepository: Repository<Habilidad>,
   
  ) {}

  /**
   * Crear una nueva habilidad
   */
  async create(dto: CreateHabilidadDto): Promise<Habilidad> {
    const habilidad = this.habilidadRepository.create(dto);
    return this.habilidadRepository.save(habilidad);
  }

  /**
   * Obtener todas las habilidades
   */
  async findAll(): Promise<Habilidad[]> {
    return this.habilidadRepository.find({
      relations: ["pokemons"], // Relacionar habilidades con los pokemons que la tienen
    });
  }

  /**
   * Obtener una habilidad por ID
   */
  async findOne(id: number): Promise<Habilidad> {
    const habilidad = await this.habilidadRepository.findOne({
      where: { id },
      relations: ["pokemons"], // Relacionar habilidades con los pokemons
    });

    if (!habilidad) {
      throw new NotFoundException(`Habilidad con id ${id} no encontrada`);
    }
    return habilidad;
  }

  /**
   * Actualizar una habilidad
   */
  async update(id: number, dto: UpdateHabilidadDto): Promise<Habilidad> {
    await this.findOne(id); // Verifica si la habilidad existe
    await this.habilidadRepository.update(id, dto);
    return this.habilidadRepository.findOne({ where: { id } }) as Promise<Habilidad>;
  }

  /**
   * Eliminar una habilidad por ID
   */
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.habilidadRepository.delete(id);
  }
}
