export interface AnimalDTO {
    id?: string;
    especie: string;
    idade: number;
    situacao: string;
    cover?: string | undefined;
}

export interface FiltroAnimalDTO {
    animal?: string;
    anos?: number;
    disponibilidade?: string;
}

export interface IAnimalRepository {
    buscaPorFiltro();
}