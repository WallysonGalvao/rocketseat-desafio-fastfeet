<h1 align="center">
    <img alt="FastFeet" title="#delicinha" src="../.github/fastfeet.png" width="250px" />
</h1>

<p align="center">
  <a href="#rocket-tecnologias">Tecnologias</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#collision-funcionalidades">Funcionalidades</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-rodando-o-projeto">Rodando o Projeto</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença">Licença</a>
</p>

<h2>
<strong>Backend</strong> da aplicação FastFeet.
</h2>

## :rocket: Tecnologias

### **Um pouco sobre as ferramentas**

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

Autenticação apenas seu ID de cadastro (ID do entregador no banco de dados).

### 2. Alterar status de encomendas

Inclusão de data de retirada e data de entrega para as encomendas.

### 3. Cadastrar problemas nas entregas

Permite que o entregador cadastre problemas nas entregas.

## :zap: Rodando o projeto

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

## :memo: Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.

---
