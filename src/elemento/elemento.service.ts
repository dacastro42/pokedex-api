import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { Elemento } from "src/common/entities/elemento.entity";
import { CreateElementoDto } from "./dto/create-elemento.dto";
import { UpdateElementoDto } from "./dto/update-elemento.dto";

@Injectable()
export class ElementoService {
  constructor(
    @InjectRepository(Elemento)
    private readonly elementoRepository: Repository<Elemento>
  ) {}

  async create(createElementoDto: CreateElementoDto): Promise<Elemento> {
    const elemento = this.elementoRepository.create(createElementoDto);
    return this.elementoRepository.save(elemento);
  }

  async findAll(): Promise<Elemento[]> {
    return this.elementoRepository.find({
      relations: ["interaccionesOrigen", "interaccionesDestino", "pokemonElemento", "elemento"]
    });
  }

  async findOne(id: number): Promise<Elemento> {
    const elemento = await this.elementoRepository.findOne({
      where: { id },
      relations: ["interaccionesOrigen", "interaccionesDestino", "pokemonElemento", "elemento"]
    });

    if (!elemento) {
      throw new NotFoundException(`Elemento con id ${id} no encontrado`);
    }
    return elemento;
  }


  async createOrFindElements(elementosNuevos?: CreateElementoDto[], elementosExistentes?: number[]): Promise<Elemento[]> {
    let elementosRelacionados: Elemento[] = [];
  
    if (elementosExistentes && elementosExistentes.length > 0) {
      elementosRelacionados = await this.elementoRepository.find({
        where: { id: In(elementosExistentes) },
      });
    }
  
    if (elementosNuevos && elementosNuevos.length > 0) {
      const nuevosElementos = this.elementoRepository.create(elementosNuevos);
      const elementosGuardados = await this.elementoRepository.save(nuevosElementos);
      elementosRelacionados = [...elementosRelacionados, ...elementosGuardados];
    }
  
    return elementosRelacionados;
  }

  async update(id: number, updateElementoDto: UpdateElementoDto): Promise<Elemento> {
    await this.findOne(id); // Verifica que el elemento existe
    await this.elementoRepository.update(id, updateElementoDto);
    return this.elementoRepository.findOne({
      where: { id },
      relations: ["interaccionesOrigen", "interaccionesDestino", "pokemonElemento", "elemento"]
    }) as Promise<Elemento>;
  }

  async remove(id: number): Promise<void> {
    await this.findOne(id); // Verifica que el elemento existe
    await this.elementoRepository.delete(id);
  }
}
