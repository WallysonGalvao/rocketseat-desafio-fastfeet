<h1 align="center">
    <img alt="FastFeet" title="#delicinha" src="../.github/fastfeet.png" width="250px" />
</h1>

<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#collision-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-rodando-o-projeto">Rodando o Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#notebook-enpoints">Endpoints</a>
</p>

<h2>
<strong>Backend</strong> da aplicação FastFeet.
</h2>

## :rocket: Tecnologias

### **Ferramentas usadas**

-   Express + Queue
-   JWT + Bcryptjs
-   Sucrase + Nodemon;
-   ESLint + Prettier + EditorConfig;
-   Sequelize + PostgreSQL;
-   Nodemailer + Handlebars
-   Youch + Sentry;

## :collision: Funcionalidades

Abaixo estão descritas as funcionalidades para o administrador e os entregadores da aplicação:

### **Administrador**

### 1. Autenticação

Autenticação do usuário administrador com e-mail e senha.

### 2. Gestão de destinatários

Cadastro de destinatários na aplicação.

### 3. Gestão de entregadores

Usuário administrador pode cadastrar entregadores para a plataforma.

### 4. Gestão de encomendas

Cadastro de encomendas por entregador.

### **Entregador**

### 1. Visualizar encomendas

Autenticação apenas por ID de cadastro (ID do entregador no banco de dados).

### 2. Alterar status de encomendas

Inclusão de data de retirada e data de entrega para as encomendas.

### 3. Cadastrar problemas nas entregas

Permite que o entregador cadastre problemas nas entregas.

## :zap: Rodando o projeto

### Docker

1 - É preciso ter o [Docker](https://www.docker.com/) instaldo em sua máquina. Feito a instalação, rodar os seguintes comandos:

```
$ docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres
$ docker run --name redisfastfeet -p 6379:6379 -d -t redis:alpine
```

2 - Após executar os comandos acima, verificar se as imagens estão rodando no terminal:

```
$ docker ps
```

3 - Caos as imagens estejam paradas/ não aparecer no terminal, executar:

```
$ docker start database
$ docker start redisfastfeet
```

### Backend

1 - Em um terminal, entrar na raiz do projeto **/backend** e rodar o comando:

```
$ yarn install
```

2 - Ainda na raiz do projeto, rodar em abas diferentes os comandos:

```
$ yarn dev
$ yarn queue
```

Feito isso, acessar o endereço http://localhost:3333

Se desejar, pode rodar o projeto em modo debug, usando o seguinte comando:

```
$ yarn dubug
```

### Migrations

Para a criar e popular o banco de dados, é disponibilizado **migrations** e **seeds** dentro do diretório **/src/database**, rodar o seguinte comando na raiz do projeto:

```
$ yarn sequelize db:migrate
```

## :notebook: Endpoints

Você pode executar online ou fazer o download dos endpoints e executar diretamente no Insomnia:

[![Run in Insomnia}](https://insomnia.rest/images/run.svg)](https://insomnia.rest/run/?label=FasfFeet&uri=https%3A%2F%2Fraw.githubusercontent.com%2FWallysonGalvao%2Frocketseat-desafio-fastfeet%2Fmaster%2Fbackend%2Frequests.json)

---
