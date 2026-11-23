export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Adoção de Animais e Abrigos",
    version: "1.0.0",
    description:
      "Documentação completa da API REST para gerenciamento de animais, abrigos, usuários, sessões e adoções.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de Desenvolvimento",
    },
  ],
  tags: [
    {
      name: "Animais",
      description: "Operações relacionadas ao gerenciamento e busca de animais",
    },
    {
      name: "Abrigos",
      description: "Operações relacionadas ao gerenciamento de abrigos",
    },
    {
      name: "Usuários",
      description: "Operações de autenticação, sessão, conta e adoções de usuários",
    },
  ],
  paths: {
    "/api/animais": {
      get: {
        tags: ["Animais"],
        summary: "Busca animais por filtros",
        description: "Retorna uma lista de animais filtrados pelos parâmetros de consulta informados.",
        parameters: [
          { $ref: "#/components/parameters/FiltroAnimalNome" },
          { $ref: "#/components/parameters/FiltroAnimalEspecie" },
          { $ref: "#/components/parameters/FiltroAnimalIdade" },
          { $ref: "#/components/parameters/FiltroAnimalSituacao" },
        ],
        responses: {
          "200": {
            description: "Lista de animais retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Animal" },
                },
                example: [
                  {
                    id: "1",
                    nome: "Rex",
                    especie: "Cachorro",
                    idade: 3,
                    situacao: "Disponível",
                    cover: "https://exemplo.com/imagens/rex.jpg",
                  },
                ],
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/animais/busca": {
      get: {
        tags: ["Animais"],
        summary: "Busca avançada de animais por filtros",
        description: "Endpoint alternativo para filtrar animais por nome, espécie, idade ou situação.",
        parameters: [
          { $ref: "#/components/parameters/FiltroAnimalNome" },
          { $ref: "#/components/parameters/FiltroAnimalEspecie" },
          { $ref: "#/components/parameters/FiltroAnimalIdade" },
          { $ref: "#/components/parameters/FiltroAnimalSituacao" },
        ],
        responses: {
          "200": {
            description: "Lista de animais filtrados retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Animal" },
                },
                example: [
                  {
                    id: "1",
                    nome: "Rex",
                    especie: "Cachorro",
                    idade: 3,
                    situacao: "Disponível",
                    cover: "https://exemplo.com/imagens/rex.jpg",
                  },
                ],
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/animais/{id}": {
      get: {
        tags: ["Animais"],
        summary: "Busca um animal pelo ID",
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Animal encontrado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Animal" },
                example: {
                  id: "1",
                  nome: "Rex",
                  especie: "Cachorro",
                  idade: 3,
                  situacao: "Disponível",
                  cover: "https://exemplo.com/imagens/rex.jpg",
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
      put: {
        tags: ["Animais"],
        summary: "Atualiza os dados de um animal",
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AtualizarAnimalInput" },
              example: {
                nome: "Rex Atualizado",
                especie: "Cachorro",
                idade: 4,
                situacao: "Adotado",
                cover: "https://exemplo.com/imagens/rex-novo.jpg",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Animal atualizado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Animal" },
                example: {
                  id: "1",
                  nome: "Rex Atualizado",
                  especie: "Cachorro",
                  idade: 4,
                  situacao: "Adotado",
                  cover: "https://exemplo.com/imagens/rex-novo.jpg",
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
      patch: {
        tags: ["Animais"],
        summary: "Atualiza parcialmente os dados de um animal",
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AtualizarAnimalInput" },
              example: {
                situacao: "Em tratamento",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Animal atualizado parcialmente com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Animal" },
                example: {
                  id: "1",
                  nome: "Rex",
                  especie: "Cachorro",
                  idade: 3,
                  situacao: "Em tratamento",
                  cover: "https://exemplo.com/imagens/rex.jpg",
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
      delete: {
        tags: ["Animais"],
        summary: "Remove um animal pelo ID",
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Animal removido com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SuccessMessage" },
                example: { message: "Animal deletado com sucesso." },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/animais": {
      post: {
        tags: ["Animais"],
        summary: "Cadastra um novo animal",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CriarAnimalInput" },
              example: {
                nome: "Rex",
                especie: "Cachorro",
                idade: 3,
                situacao: "Disponível",
                cover: "https://exemplo.com/imagens/rex.jpg",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Animal cadastrado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Animal" },
                example: {
                  id: "1",
                  nome: "Rex",
                  especie: "Cachorro",
                  idade: 3,
                  situacao: "Disponível",
                  cover: "https://exemplo.com/imagens/rex.jpg",
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/abrigos": {
      get: {
        tags: ["Abrigos"],
        summary: "Lista todos os abrigos",
        parameters: [
          {
            name: "nome",
            in: "query",
            required: false,
            description: "Filtrar abrigos pelo nome",
            schema: { type: "string" },
            example: "Abrigo Patas Felizes",
          },
          {
            name: "endereco",
            in: "query",
            required: false,
            description: "Filtrar abrigos pelo endereço",
            schema: { type: "string" },
            example: "Rua das Flores",
          },
          {
            name: "avaliacao",
            in: "query",
            required: false,
            description: "Filtrar abrigos pela avaliação inteira",
            schema: { type: "integer" },
            example: 5,
          },
        ],
        responses: {
          "200": {
            description: "Lista de abrigos retornada com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/Abrigo" },
                },
                example: [
                  {
                    id: "1",
                    nome: "Abrigo Patas Felizes",
                    endereco: "Rua das Flores, 123 - Centro",
                    avaliacao: 5,
                  },
                ],
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
      patch: {
        tags: ["Abrigos"],
        summary: "Atualiza parcialmente um abrigo",
        parameters: [
          {
            name: "id",
            in: "query",
            required: false,
            description: "Identificador do abrigo a ser atualizado parcialmente",
            schema: { type: "string" },
            example: "1",
          },
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AtualizarAbrigoInput" },
              example: {
                avaliacao: 4,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Abrigo atualizado parcialmente com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Abrigo" },
                example: {
                  id: "1",
                  nome: "Abrigo Patas Felizes",
                  endereco: "Rua das Flores, 123 - Centro",
                  avaliacao: 4,
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/abrigos": {
      post: {
        tags: ["Abrigos"],
        summary: "Cadastra um novo abrigo",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CriarAbrigoInput" },
              example: {
                nome: "Abrigo Patas Felizes",
                endereco: "Rua das Flores, 123 - Centro",
                avaliacao: 5,
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Abrigo cadastrado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Abrigo" },
                example: {
                  id: "1",
                  nome: "Abrigo Patas Felizes",
                  endereco: "Rua das Flores, 123 - Centro",
                  avaliacao: 5,
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/abrigos/{id}": {
      put: {
        tags: ["Abrigos"],
        summary: "Atualiza os dados de um abrigo",
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AtualizarAbrigoInput" },
              example: {
                nome: "Abrigo Patas Felizes - Unidade II",
                endereco: "Avenida Brasil, 450 - Jardim",
                avaliacao: 5,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Abrigo atualizado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Abrigo" },
                example: {
                  id: "1",
                  nome: "Abrigo Patas Felizes - Unidade II",
                  endereco: "Avenida Brasil, 450 - Jardim",
                  avaliacao: 5,
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/abrigos/{id}": {
      delete: {
        tags: ["Abrigos"],
        summary: "Remove um abrigo pelo ID",
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Abrigo removido com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SuccessMessage" },
                example: { message: "Abrigo deletado com sucesso." },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/sessao": {
      get: {
        tags: ["Usuários"],
        summary: "Verifica a sessão ativa do usuário",
        responses: {
          "200": {
            description: "Dados da sessão ativa retornados com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    autenticado: { type: "boolean" },
                    usuario: { $ref: "#/components/schemas/Usuario" },
                  },
                },
                example: {
                  autenticado: true,
                  usuario: {
                    id: "1",
                    nome: "Maria Silva",
                    email: "maria.silva@exemplo.com",
                    adocoes: "Rex",
                  },
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/minha-conta": {
      get: {
        tags: ["Usuários"],
        summary: "Lista os dados da conta do usuário autenticado",
        responses: {
          "200": {
            description: "Dados da conta retornados com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Usuario" },
                example: {
                  id: "1",
                  nome: "Maria Silva",
                  email: "maria.silva@exemplo.com",
                  adocoes: "Rex",
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
      put: {
        tags: ["Usuários"],
        summary: "Atualiza o perfil do usuário autenticado",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AtualizarUsuarioInput" },
              example: {
                nome: "Maria Oliveira Silva",
                email: "maria.oliveira@exemplo.com",
                senha: 654321,
                adocoes: "Rex, Luna",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Perfil atualizado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Usuario" },
                example: {
                  id: "1",
                  nome: "Maria Oliveira Silva",
                  email: "maria.oliveira@exemplo.com",
                  adocoes: "Rex, Luna",
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/usuarios/{id}": {
      get: {
        tags: ["Usuários"],
        summary: "Busca a conta de um usuário pelo ID",
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Usuário encontrado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Usuario" },
                example: {
                  id: "1",
                  nome: "Maria Silva",
                  email: "maria.silva@exemplo.com",
                  adocoes: "Rex",
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/cadastro": {
      post: {
        tags: ["Usuários"],
        summary: "Cadastra um novo usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/CriarUsuarioInput" },
              example: {
                nome: "Maria Silva",
                email: "maria.silva@exemplo.com",
                senha: 123456,
                adocoes: "Rex",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Usuário cadastrado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Usuario" },
                example: {
                  id: "1",
                  nome: "Maria Silva",
                  email: "maria.silva@exemplo.com",
                  adocoes: "Rex",
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/login": {
      post: {
        tags: ["Usuários"],
        summary: "Autentica um usuário no sistema",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/LoginInput" },
              example: {
                email: "maria.silva@exemplo.com",
                senha: 123456,
              },
            },
          },
        },
        responses: {
          "200": {
            description: "Login realizado com sucesso.",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: { type: "string" },
                    token: { type: "string" },
                  },
                },
                example: {
                  message: "Login realizado com sucesso.",
                  token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/logout": {
      post: {
        tags: ["Usuários"],
        summary: "Encerra a sessão do usuário autenticado",
        responses: {
          "200": {
            description: "Logout realizado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SuccessMessage" },
                example: { message: "Logout realizado com sucesso." },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/adocoes": {
      post: {
        tags: ["Usuários"],
        summary: "Registra uma adoção para o usuário",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AdocaoInput" },
              example: {
                animalId: "1",
                usuarioId: "1",
                adocoes: "Rex",
              },
            },
          },
        },
        responses: {
          "201": {
            description: "Adoção registrada com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SuccessMessage" },
                example: { message: "Adoção registrada com sucesso." },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/api/usuarios/{id}/email": {
      patch: {
        tags: ["Usuários"],
        summary: "Atualiza o e-mail de um usuário específico",
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: { $ref: "#/components/schemas/AtualizarEmailInput" },
              example: {
                email: "novo.email@exemplo.com",
              },
            },
          },
        },
        responses: {
          "200": {
            description: "E-mail atualizado com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Usuario" },
                example: {
                  id: "1",
                  nome: "Maria Silva",
                  email: "novo.email@exemplo.com",
                  adocoes: "Rex",
                },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
    "/minha-conta/{id}": {
      delete: {
        tags: ["Usuários"],
        summary: "Exclui a conta do usuário pelo ID",
        parameters: [{ $ref: "#/components/parameters/IdParam" }],
        responses: {
          "200": {
            description: "Conta de usuário removida com sucesso.",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/SuccessMessage" },
                example: { message: "Usuário deletado com sucesso." },
              },
            },
          },
          "400": { $ref: "#/components/responses/BadRequest" },
          "404": { $ref: "#/components/responses/NotFound" },
          "500": { $ref: "#/components/responses/InternalServerError" },
        },
      },
    },
  },
  components: {
    parameters: {
      IdParam: {
        name: "id",
        in: "path",
        required: true,
        description: "Identificador único do recurso",
        schema: {
          type: "string",
        },
        example: "1",
      },
      FiltroAnimalNome: {
        name: "nome",
        in: "query",
        required: false,
        description: "Filtrar animais pelo nome",
        schema: {
          type: "string",
          minLength: 1,
        },
        example: "Rex",
      },
      FiltroAnimalEspecie: {
        name: "especie",
        in: "query",
        required: false,
        description: "Filtrar animais pela espécie",
        schema: {
          type: "string",
          minLength: 3,
        },
        example: "Cachorro",
      },
      FiltroAnimalIdade: {
        name: "idade",
        in: "query",
        required: false,
        description: "Filtrar animais pela idade (número inteiro)",
        schema: {
          type: "integer",
        },
        example: 3,
      },
      FiltroAnimalSituacao: {
        name: "situacao",
        in: "query",
        required: false,
        description: "Filtrar animais pela situação atual",
        schema: {
          type: "string",
          minLength: 3,
        },
        example: "Disponível",
      },
    },
    schemas: {
      CriarAnimalInput: {
        type: "object",
        required: ["nome", "especie", "idade", "situacao"],
        properties: {
          nome: {
            type: "string",
            minLength: 1,
            description: "O nome do animal deve ter pelo menos 1 caractere.",
            example: "Rex",
          },
          especie: {
            type: "string",
            minLength: 3,
            description: "A espécie do animal deve ter pelo menos 3 caracteres.",
            example: "Cachorro",
          },
          idade: {
            type: "integer",
            description: "A idade do animal deve ser um número inteiro.",
            example: 3,
          },
          situacao: {
            type: "string",
            minLength: 3,
            description: "A situação do animal deve ter pelo menos 3 caracteres.",
            example: "Disponível",
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            description: "URL válida da foto do animal ou string vazia.",
            example: "https://exemplo.com/imagens/rex.jpg",
          },
        },
      },
      AtualizarAnimalInput: {
        type: "object",
        properties: {
          nome: {
            type: "string",
            minLength: 1,
            example: "Rex",
          },
          especie: {
            type: "string",
            minLength: 3,
            example: "Cachorro",
          },
          idade: {
            type: "integer",
            example: 4,
          },
          situacao: {
            type: "string",
            minLength: 3,
            example: "Adotado",
          },
          cover: {
            type: "string",
            format: "uri",
            nullable: true,
            example: "https://exemplo.com/imagens/rex.jpg",
          },
        },
      },
      Animal: {
        allOf: [
          {
            type: "object",
            properties: {
              id: { type: "string", example: "1" },
            },
          },
          { $ref: "#/components/schemas/CriarAnimalInput" },
        ],
      },
      CriarAbrigoInput: {
        type: "object",
        required: ["nome", "endereco", "avaliacao"],
        properties: {
          nome: {
            type: "string",
            minLength: 1,
            description: "O nome do abrigo deve ter pelo menos 1 caractere.",
            example: "Abrigo Patas Felizes",
          },
          endereco: {
            type: "string",
            minLength: 3,
            description: "O endereço deve ter pelo menos 3 caracteres.",
            example: "Rua das Flores, 123 - Centro",
          },
          avaliacao: {
            type: "integer",
            description: "A avaliação do abrigo deve ser um número inteiro.",
            example: 5,
          },
        },
      },
      AtualizarAbrigoInput: {
        type: "object",
        properties: {
          nome: {
            type: "string",
            minLength: 1,
            example: "Abrigo Patas Felizes",
          },
          endereco: {
            type: "string",
            minLength: 3,
            example: "Rua das Flores, 123 - Centro",
          },
          avaliacao: {
            type: "integer",
            example: 4,
          },
        },
      },
      Abrigo: {
        allOf: [
          {
            type: "object",
            properties: {
              id: { type: "string", example: "1" },
            },
          },
          { $ref: "#/components/schemas/CriarAbrigoInput" },
        ],
      },
      CriarUsuarioInput: {
        type: "object",
        required: ["nome", "email", "senha", "adocoes"],
        properties: {
          nome: {
            type: "string",
            minLength: 1,
            description: "O nome do usuário deve ter pelo menos 1 caractere.",
            example: "Maria Silva",
          },
          email: {
            type: "string",
            format: "email",
            minLength: 3,
            description: "E-mail válido do usuário.",
            example: "maria.silva@exemplo.com",
          },
          senha: {
            type: "integer",
            description: "A senha do usuário deve ser um número inteiro.",
            example: 123456,
          },
          adocoes: {
            type: "string",
            minLength: 3,
            description: "As adoções do usuário devem ter pelo menos 3 caracteres.",
            example: "Rex",
          },
        },
      },
      AtualizarUsuarioInput: {
        type: "object",
        properties: {
          nome: {
            type: "string",
            minLength: 1,
            example: "Maria Silva",
          },
          email: {
            type: "string",
            format: "email",
            minLength: 3,
            example: "maria.silva@exemplo.com",
          },
          senha: {
            type: "integer",
            example: 123456,
          },
          adocoes: {
            type: "string",
            minLength: 3,
            example: "Rex, Luna",
          },
        },
      },
      Usuario: {
        type: "object",
        properties: {
          id: { type: "string", example: "1" },
          nome: { type: "string", example: "Maria Silva" },
          email: { type: "string", format: "email", example: "maria.silva@exemplo.com" },
          adocoes: { type: "string", example: "Rex" },
        },
      },
      LoginInput: {
        type: "object",
        required: ["email", "senha"],
        properties: {
          email: {
            type: "string",
            format: "email",
            minLength: 3,
            example: "maria.silva@exemplo.com",
          },
          senha: {
            type: "integer",
            example: 123456,
          },
        },
      },
      AtualizarEmailInput: {
        type: "object",
        required: ["email"],
        properties: {
          email: {
            type: "string",
            format: "email",
            minLength: 3,
            example: "novo.email@exemplo.com",
          },
        },
      },
      AdocaoInput: {
        type: "object",
        required: ["animalId"],
        properties: {
          animalId: {
            type: "string",
            example: "1",
          },
          usuarioId: {
            type: "string",
            example: "1",
          },
          adocoes: {
            type: "string",
            minLength: 3,
            example: "Rex",
          },
        },
      },
      SuccessMessage: {
        type: "object",
        properties: {
          message: {
            type: "string",
            example: "Operação realizada com sucesso.",
          },
        },
      },
      ErrorResponse: {
        type: "object",
        properties: {
          error: {
            type: "string",
            example: "Erro ao processar a requisição.",
          },
          details: {
            type: "array",
            items: {
              type: "object",
              properties: {
                campo: { type: "string", example: "nome" },
                mensagem: {
                  type: "string",
                  example: "O nome deve ter pelo menos 1 caractere.",
                },
              },
            },
          },
        },
      },
    },
    responses: {
      BadRequest: {
        description: "Requisição inválida ou erro de validação dos dados enviados.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: {
              error: "Dados inválidos.",
              details: [
                {
                  campo: "nome",
                  mensagem: "O nome deve ter pelo menos 1 caractere.",
                },
              ],
            },
          },
        },
      },
      NotFound: {
        description: "Recurso não encontrado.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: {
              error: "Recurso não encontrado.",
            },
          },
        },
      },
      InternalServerError: {
        description: "Erro interno no servidor.",
        content: {
          "application/json": {
            schema: { $ref: "#/components/schemas/ErrorResponse" },
            example: {
              error: "Erro interno do servidor.",
            },
          },
        },
      },
    },
  },
}