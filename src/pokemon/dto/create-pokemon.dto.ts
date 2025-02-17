export class CreatePokemonDto {
  numeropokemon: number;
  nombrePokemon: string;
  iconoPokemon?: Buffer; // Imagen opcional
  nombrePokemonJapones?: string;
  idgeneracionf: number;
}