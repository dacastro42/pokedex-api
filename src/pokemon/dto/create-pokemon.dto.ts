export class CreateHabilidadDto {
  nombre: string;
  descripcion: string;
}

export class CreatePokemonDto {
  numero: number;
  nombre: string;
  nombreJapones?: string;
  generacionId: number;
  habilidades?: CreateHabilidadDto[];
  habilidadesNuevas?: CreateHabilidadDto[];  // Habilidades nuevas
  habilidadesExistentes?: number[];   
}
