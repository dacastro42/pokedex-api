export class CreateHabilidadDto {
  nombre: string;
  descripcion: string;
}
export class CreateElementoDto {
  nombre: string;
  descripcion: string;
  color: string;
  efectoClima?: string;
}

export class CreatePokemonDto {
  numero: number;
  nombre: string;
  nombreJapones?: string;
  generacionId: number;

 // habilidades?: CreateHabilidadDto[];
  habilidadesNuevas?: CreateHabilidadDto[];  // Habilidades nuevas
  habilidadesExistentes?: number[];   

  //elemento?: CreateElementoDto[];
  elementosNuevos?: CreateElementoDto[];    // Elementos nuevos
  elementosExistentes?: number[];           // IDs de elementos ya existentes
}
