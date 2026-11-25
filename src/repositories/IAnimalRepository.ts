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
    buscaPorFiltro(): Promise<any[]>;
    buscaPorId(id: string): Promise<any[] | null>;
    cadastrar(dados: AnimalDTO):Promise<any[]>;
    atualizar(id: string, dados: AnimalDTO): Promise<any[]>;
    atualizarParcialmente(id: string, dados: Partial<AnimalDTO>): Promise<any[] | null>;
    deletar(id: string ): Promise<boolean>;
}