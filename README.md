# Trybe Futebol Club

Esta aplicação foi um dos projetos avaliativos do módulo de backend no curso de desenvolvimento web na Trybe onde eu pude praticar todo meu aprendizado de back-end. Nele recebi um frontend react pronto que exibe informações sobre partidas e classificações de futebol.

Minha missão nesse projeto foi, a partir de um frontend sem lógica (apenas exibe informações), desenvolver uma API na arquitetura MSC e utilizando princípios SOLID com TypeScript e OOP que seria responsável por:

- Criar e manipular um banco de dados MySQL para armazenar todos os dados;
- Autenticar usuários cadastrados através do login;
- Listar clubes cadastrados;
- Listar partidas em andamento e partidas finalizadas;
- Adicionar partidas em andamento;
- Atualizar o placar das partidas em andamento;
- Finalizar partidas;
- Gerar leaderboards ranqueadas e ordenadas baseadas no desempenho dos clubes nas partidas cadastradas, utilizando 5 critérios avaliativos e separando em 3 tipos de classificação (geral, mandante e visitante);
- Orquestrar tudo isso (banco de dados, backend e frontend) em containers `Docker` e executá-los de forma conjunta através de uma orquestração com `Docker-Compose`.

- Além disso, a aplicação foi feita com cobertura de testes com mais de 90% em todas as camadas utilizando Mocha,Chai e Sinon.

![gifpronto](https://user-images.githubusercontent.com/87549119/169073511-1c422faf-1b2c-4bf1-87eb-6d5d3eec1301.gif)

A aplicação pode ser acessada por [aqui](https://front-end-futebol-club.herokuapp.com/).

A API pode ser acessada pela porta `3001`

Ps: Caso seu navegador tente acessar a página através do protocolo HTTPS e acuse erro, será necessário alterar manualmente a URL para o protocolo HTTP.

Ps2: Para realizar o login na aplicação basta usar as seguintes credenciais:

    login: admin@admin.com
    senha: secret_admin 

## Stacks utilizadas

- Node.js
- TypeScript
- Object-Oriented Programming
- Express
- MySQL
- Sequelize
- Docker
- Mocha + Chai + Sinon
- Heroku

#### Além das Stacks citadas acima, também foram utilizadas as seguintes bibliotecas:

- `Joi` para fazer a validação do corpo das requisições;
- `JWT` para fazer a autenticação dos usuários logados;
- `bcrypt` para fazer hashing e verificação das senhas armazenadas no banco de dados.

## Rodando localmente

***Para rodar a API localmente certifique-se de ter [Docker](https://docs.docker.com/get-docker/) 
e [Docker-Compose](https://docs.docker.com/compose/install/) instalados em sua maquina.***

Obs: Docker e Docker-Compose utilizados no desenvolvimento e execução deste projeto estavam nas versões `20.10.13` e `1.29.2` respectivamente.
Obs: Verefique a versão do seu Node, caso nao esteja na versao v16.15.0, use o comando 'nvm install --lts'

Clone o projeto

```bash
  git clone git@github.com:alexcubas/Futebol-Clube.git
```

Entre no diretório do projeto

```bash
  cd Backend-Futebol
```

Suba a API

```bash
  npm start
```

