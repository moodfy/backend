# Index

- [Index](#index)
  - [Estrutura do projeto](#estrutura-do-projeto)
    - [Para executar o projeto](#para-executar-o-projeto)
    - [Para buildar o projeto](#para-buildar-o-projeto)
- [Features](#features)
  - [v1 :: Shrekness](#v1--shrekness)

## Estrutura do projeto

A estrutura do projeto é a seguinte:

````text
backend
├── src              // TypeScript code
│   ├── entity       // entidades (database models)
│   │   └── User.ts  // exemplo de entidade
│   ├── migration    // migrations
│   └── index.ts     // arquivo principal do projeto
├── .gitignore       // arquivos para serem ignorados pelo git
├── ormconfig.js   // configurações do typeorm
├── package.json     // node module dependencies
├── README.md        // simple readme file
├── Dockerfile    // Dockerfile para executar o projeto em  container
├── .babelrc    //  Babel toolchain config
├── .env-example    // estrutura do arquivo .env
├── docker-compose.yml    // docker compose para subir o banco de dados
├── .dockerignore    // arquivos para serem ignorados pelo docker
└── tsconfig.json    // TypeScript compiler options
````

### Para executar o projeto

Para ser possível executar esse projeto, é necessário criar um projeto no [spotify](https://developer.spotify.com/dashboard/).

1. Crie um arquivo `.env` com base no arquivo `.env-example`
2. Execute o comando `npm i`
3. Execute o comando `docker-compose up` para executar o banco de dados em um container
4. Execute o comando `npm start` para iniciar o projeto
Para rodar o projeto, crie um arquivo .env, cos atributos presentes no .env-example, e basta rodar o npm start.

### Para buildar o projeto

1. No `.env` altere a variável `NODE_ENV` para `production`
2. Para buildar no windows, execute o comando `npm run build:win`
3. Para buildar no linux, execute o comando `npm run build`
4. Execute o comando `node .\buid\` para executar projeto

# Features

## v1 :: Shrekness

A nossa primeira funcionalidade é uma análise nas suas últimas 50 músicas reproduzidas. Com base nela, a gente avalia a propriedade valence, presente em cada música existente no spotify. Essa propriedade diz o quão triste ou alegre a música é. A escala vai de 0 a 1. Para ter como exemplo, a música Creep do RadioHead tem 0.104. Já a música All Star do Smash Mouth tem 0.776.

Com base em temperamentos do Shrek durante o primeiro filme, foi feito um rank dos estados de espírito do Shrek com base no atributo valence das músicas ouvidas recentemente.
