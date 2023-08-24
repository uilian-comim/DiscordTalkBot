# DISCORD TALK BOT

## Introdução

O projeto Discord Talk Bot é uma plataforma que oferece uma interface simples e eficaz para se comunicar através de chats de texto em servidores e canais privados no Discord. Com o Discord Talk Bot, você pode interagir facilmente com outros usuários que estejam no mesmo servidor compartilhado.

## Links Rápidos

-   [Introdução](#Introdução)
-   [Tecnologias Utilizadas](#tecnologias-utilizadas)
-   [Requisitos](#requisitos)
-   [Configuração](#configuração)
-   [Instalação](#instalação)
-   [Inicialização](#inicialização-simples)

## Tecnologias Utilizadas

### Front End

-   [Next.js](https://nextjs.org/)
-   [Daisy-ui](https://daisyui.com/)
-   [Tailwind CSS](https://tailwindcss.com/)
-   [Socket.io-client](https://socket.io/docs/v4/client-installation/)
-   [yup](https://www.npmjs.com/package/yup)
-   [react-hook-form](https://react-hook-form.com/)

### Back End

-   [Express](https://expressjs.com/)
-   [Socket.io](https://socket.io/docs/v4/server-installation/)
-   [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
-   [discord.js](https://discord.js.org/#/)
-   [prisma](https://www.prisma.io/)

### Linguagem

-   [Javascript | Typescript](https://www.typescriptlang.org/)

## Requisitos

-   [Node.js](https://nodejs.org/en/) (v18.7.0)
-   [Docker](https://www.docker.com/)
-   [Discord Developer](https://discord.com/developers/applications)

## Configuração

### Variáveis de Ambiente

-   Crie um arquivo `.env` na pasta `software` e preencha as variáveis de ambiente de acordo com o arquivo `.env.example`.

### Instalação

```bash
npm install ou pnpm install ou yarn install
```

## Inicialização

### Front End

```bash
npm run dev ou pnpm run dev ou yarn dev
```

### Back End

-   Antes de iniciar o servidor, é necessário criar um banco de dados mysql.

-   Após a criação do banco de dados, configure o arquivo `.env` com as informações do banco de dados.

-   Após a configuração do banco de dados, execute o comando abaixo para criar as tabelas no banco de dados.

```bash
npx prisma db push
```

```bash
npm run dev ou pnpm run dev ou yarn dev
```

## Inicialização simples

-   Para uma inicialização simples, é necessário ter o docker instalado na máquina.

-   Após a instalação do docker, execute o comando abaixo para iniciar o projeto.

```bash
docker-compose up -d
```

## Licença

Copyright 2023 Uilian Comim
