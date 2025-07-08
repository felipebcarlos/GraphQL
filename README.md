# 🚀 Hands-On: API de Biblioteca com GraphQL e Node.js

Bem-vindo a este projeto de estudo prático focado na construção de uma API GraphQL do zero! O objetivo aqui é explorar os conceitos fundamentais e avançados do GraphQL, partindo de um servidor simples até um grafo de dados relacional e complexo.

Este repositório documenta o passo a passo da criação de uma API para uma biblioteca fictícia, contendo 100 livros e seus respectivos autores.

<br>

![Apollo Sandbox Screenshot](https://github.com/user-attachments/assets/4bd903f5-92b5-4fdb-a9df-c0aca4e95e7a)
*Um exemplo da API em ação no Apollo Sandbox.*

<br>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-18.x+-brightgreen?style=for-the-badge&logo=node.js" alt="Node.js version">
  <img src="https://img.shields.io/badge/GraphQL-v16.x-E10098?style=for-the-badge&logo=graphql" alt="GraphQL version">
  <img src="https://img.shields.io/badge/Apollo%20Server-v4.x-311C87?style=for-the-badge&logo=apollo-graphql" alt="Apollo Server version">
  <img src="https://img.shields.io/github/license/felipebcarlos/GraphQL?style=for-the-badge&logo=mit">
  <img src="https://img.shields.io/badge/PowerShell-5391FE?style=for-the-badge&logo=powershell&logoColor=white">
  <img src="https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white">

</p>

## 📚 Tabela de Conteúdos

* [📌 Visão Geral do Projeto](#-visão-geral-do-projeto)
* [✨ Funcionalidades Implementadas](#-funcionalidades-implementadas)
* [🛠️ Tecnologias Utilizadas](#️-tecnologias-utilizadas)
* [🏁 Como Executar o Projeto](#-como-executar-o-projeto)
* [🎯 Exemplos de Queries](#-exemplos-de-queries)
* [📂 Estrutura do Projeto](#-estrutura-do-projeto)
* [🔮 Próximos Passos](#-próximos-passos)
* [📄 Licença](#-licença)

## 📌 Visão Geral do Projeto

Este projeto nasceu como um exercício prático para demonstrar o poder e a flexibilidade do GraphQL em comparação com arquiteturas de API mais tradicionais como o REST. Iniciamos com um servidor básico que retornava uma lista estática e evoluímos para uma API que modela um grafo de dados, onde `Livros` e `Autores` são entidades distintas e interconectadas.

Toda a base de dados é estática e está contida no próprio arquivo `index.js` para simplificar o foco no GraphQL.

## ✨ Funcionalidades Implementadas

-   [x] **Servidor GraphQL**: Configurado com Node.js e Apollo Server 4.
-   [x] **Schema Fortemente Tipado**: Definição clara dos tipos `Livro` e `Autor`.
-   [x] **Base de Dados Rica**: Contém 100 livros e seus respectivos autores com múltiplos campos, incluindo `id`, `genero` e `notaMediaLeitores`.
-   [x] **Queries Simples**: Busca pela lista completa de livros e autores.
-   [x] **Queries com Argumentos**: Busca por um livro ou autor específico através de seu `ID`.
-   [x] **Grafo de Dados Relacional**: Implementação de um relacionamento entre `Livro` e `Autor`.
-   [x] **Resolvers Aninhados**: Lógica que permite navegar entre as entidades (ex: buscar um livro e, dentro dele, os detalhes do autor).
-   [x] **Implementar Mutations**: Adicionar a capacidade de criar, atualizar e deletar livros e autores.

## 🛠️ Tecnologias Utilizadas

* **[Node.js](https://nodejs.org/)**: Ambiente de execução JavaScript no lado do servidor.
* **[GraphQL](https://graphql.org/)**: Linguagem de consulta para APIs.
* **[Apollo Server](https://www.apollographql.com/docs/apollo-server/)**: Servidor GraphQL para Node.js que facilita a conexão com frameworks e o gerenciamento do schema.
* **[Windows 11](https://img.shields.io/badge/Windows-0078D6?style=for-the-badge&logo=windows&logoColor=white)**: Sistema operacional usado para esta demonstração.
* **[](https://learn.microsoft.com/pt-br/powershell/scripting/overview?view=powershell-5.1)**: Shell de comando nativo do sistema operacional Windows, e usado para esta demonstração.

## 🏁 Como Executar o Projeto

Para executar este projeto localmente, siga os passos abaixo.

### Pré-requisitos

* É necessário ter o [Node.js](https://nodejs.org/en/download/) (versão 18.x ou superior) instalado.
* Um gerenciador de pacotes como `npm` ou `yarn`. (npm pode ser incluído na instalação do Node.js)

### Configuração

1.  Copie o arquivo index.js hospedado neste repositório.

2.  Abra uma sessão de Powershell e crie uma pasta para seu projeto:
    ```powershell
    mkdir graphql-server-example
    ```

3.  Navegue até o diretório do projeto:
    ```powershell
    cd graphql-server-example
    ```

4.  Inicie o projeto e instale as dependências:
    ```powershell
    # Inicia um projeto npm com as configurações padrão
    npm init -y

    # Instala as bibliotecas necessárias
    npm install @apollo/server graphql
    ```

5.  Inicie o servidor GraphQL:
    ```powershell
    node index.js
    ```

6.  Abra seu navegador e acesse **[http://localhost:4000/](http://localhost:4000/)**. Você será recebido pelo **Apollo Sandbox**, uma interface gráfica onde poderá executar todas as queries.

## 🎯 Exemplos de Queries

Copie e cole estas queries no Apollo Sandbox para ver a mágica acontecer!

### 1. Buscar a lista de todos os livros e todos os campos de informação

```graphql
query {
  livros {
    titulo
    genero
    edicao
    precoMedio
    quantidadeVendas
    dataLancamento
    editora
    notaMediaLeitores
    autor {
      id
      nome
      pais
    }
  }
}
```

### 2. Buscar um livro específico pelo seu ID

```graphql
query {
  livro(id: "34") {
    id
    titulo
    autor {
      nome
    }    
  }
}
```

### 3. Buscar todos os livros de uma editora que estão na nossa base
```graphql
query {
  livros(filter: {editora: "Record", notaMinima: 4.0}) {
    titulo
    }
  }
}
```

### 4. Buscar por livros que tenham nota dos leitores acima de 4.0
```graphql
query BuscarLivrosComBoasNotas {
  livros(filter: { notaMinima: 4.0 }) {
    id
    titulo
    notaMediaLeitores
    autor {
      nome
    }
  }
}
```

### 5. Criar um novo livro na base
```graphql
mutation CriarLivroCompletoComAutor {
  adicionarLivroComNovoAutor(
    livroData: {
      titulo: "As Aventuras Completas de GraphQL"
      genero: "Ficção Científica Didática"
      editora: "Galáxia Dev"
      precoMedio: 129.90
      notaMediaLeitores: 5.0
      dataLancamento: "2025-07-06"
    },
    autorData: {
      nome: "Astro Coder"
      pais: "Via Láctea"
    }
  ) {
    id
    titulo
    precoMedio
    dataLancamento
    genero
    editora
    notaMediaLeitores
    autor {
      id
      nome
      pais
    }
  }
}
```

## 📂 Estrutura do projeto
```tree
/
├── node_modules/
├── index.js        # O coração da nossa API: schema, resolvers e dados.
├── package-lock.json
├── package.json
└── README.md       # Este arquivo!
```

## 🔮 Próximos Passos
Este projeto é um ponto de partida. Os próximos passos lógicos para evoluí-lo seriam:

-   [ ] **Adicionar Filtros Avançados**: Implementar filtros por gênero, preço, data de lançamento, etc.
-   [ ] **Implementar Paginação**: Retornar os dados em "páginas" para lidar com grandes volumes de informação.
-   [ ] **Conectar a um Banco de Dados**: Substituir a base de dados estática por uma conexão a um banco de dados real (como PostgreSQL, MongoDB ou Firebase).
-   [ ] **Refatorar o Código**: Separar o schema, os resolvers e a fonte de dados em arquivos diferentes para melhor organização.

## 📄 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.
