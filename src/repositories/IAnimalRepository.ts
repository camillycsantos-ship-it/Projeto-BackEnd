export interface AnimalDTO {
    id?: string;
    nome: string;
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
    buscaPorFiltro(filtros: FiltroAnimalDTO): Promise<AnimalDTO[]>;
    buscaPorId(id: string): Promise<AnimalDTO | null>;
    cadastrar(dados: AnimalDTO):Promise<AnimalDTO>;
    atualizar(id: string, dados: AnimalDTO): Promise<AnimalDTO | null>;
    atualizarParcialmente(id: string, dados: Partial<AnimalDTO>): Promise<AnimalDTO | null>;
    deletar(id: string ): Promise<boolean>;
}