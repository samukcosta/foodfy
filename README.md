# Foodfy

<p align="center">
     <img alt="logo foodfy" src="https://github.com/lucas-felinto/foodfy/blob/master/public/_imgs/logo_b.png?raw=true" width="150" />
     <img alt="chef foodfy" src="https://github.com/lucas-felinto/foodfy/blob/master/public/_imgs/chef.png?raw=true" width="100" height="150" />
</p>

<p align="center">
    <img src="https://img.shields.io/badge/made%20by-Samuel%20Costa-6558C3?style=flat-square">
    <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/samukcosta/foodfy?color=6558C3&style=flat-square">
    <img alt="GitHub Top Language" src="https://img.shields.io/github/languages/top/samukcosta/foodfy?color=6558C3&style=flat-square">
    <a href="https://opensource.org/licenses/MIT">
        <img alt="License" src="https://img.shields.io/badge/license-MIT-6558C3?style=flat-square">
    </a>
</p>

<h2 align="center">
    🍽 As melhores receitas você encontra aqui!
</h2>

## 📌 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Etapas do Desenvolvimento](#etapas-do-desenvolvimento)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação e Execução](#instalação-e-execução)
- [Licença](#licença)
- [Contato](#contato)

---

## 📝 Sobre o Projeto

O **Foodfy** é um projeto desenvolvido durante o Bootcamp **LaunchBase** da [Rocketseat](https://rocketseat.com.br/), com o objetivo de criar uma aplicação web para gerenciamento e exploração de receitas. O projeto foi construído em etapas progressivas, adicionando funcionalidades como administração de receitas, uso de templates dinâmicos e persistência de dados com PostgreSQL.

---

## 🏗 Etapas do Desenvolvimento

O projeto foi desenvolvido em quatro etapas principais:

### 1️⃣ [Construindo o Foodfy](https://github.com/Rocketseat/bootcamp-launchbase-desafios-02/blob/master/desafios/02-foodfy.md)
- Desenvolvimento do layout inicial
- Estruturação básica da aplicação

### 2️⃣ [Refatorando Foodfy](https://github.com/Rocketseat/bootcamp-launchbase-desafios-03)
- Implementação do servidor com **Node.js**
- Uso do **Nunjucks** para renderização de templates dinâmicos

### 3️⃣ [Admin Foodfy](https://github.com/Rocketseat/bootcamp-launchbase-desafios-04/blob/master/desafios/04-admin-foodfy.md)
- Criação da área administrativa
- Gerenciamento de receitas e chefs

### 4️⃣ [Persistindo Dados da Aplicação](https://github.com/Rocketseat/bootcamp-launchbase-desafios-05/blob/master/desafios/05-persistindo-dados-foodfy.md)
- Integração com **PostgreSQL**
- Implementação da funcionalidade de cadastro de chefs

---

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **HTML** - Estrutura das páginas
- **CSS** - Estilização e responsividade
- **JavaScript** - Funcionalidades dinâmicas
- **Nunjucks** - Template engine para exibição de dados dinâmicos
- **Node.js** - Servidor backend
- **Express** - Framework para criação da API
- **PostgreSQL** - Banco de dados relacional
- **Multer** - Upload de imagens

---

## 🛠 Instalação e Execução

### 📌 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org/)
- Um gerenciador de pacotes: **npm** ou **yarn**

### 🔧 Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

```
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASS=sua_senha
DB_NAME=foodfy
```

### 📥 Clonando o repositório

```bash
$ git clone https://github.com/samukcosta/foodfy.git
$ cd foodfy
```

### 📦 Instalando as dependências

```bash
$ npm install
```

### 🗄 Criando o banco de dados PostgreSQL

1. Abra o PostgreSQL e crie um banco de dados chamado **foodfy**.
2. Execute os comandos contidos no arquivo **bd.sql** para criar as tabelas.

### ▶️ Executando o projeto

```bash
$ npm start
```

---

## 📝 Licença

Este projeto está sob a licença **MIT**. Veja o arquivo [LICENSE](./LICENSE) para mais detalhes.

---

## 📞 Contato

Feito com ❤️ por **Samuel Costa** 👋🏽

[![Linkedin Badge](https://img.shields.io/badge/-Samuel%20Costa-blue?style=flat-square&logo=Linkedin&logoColor=white&link=https://www.linkedin.com/in/costa-samuel/)](https://www.linkedin.com/in/costa-samuel/)
[![Gmail Badge](https://img.shields.io/badge/-samuelcosta@email.com-c14438?style=flat-square&logo=Gmail&logoColor=white&link=mailto:samu.ks@outlook.com)](mailto:samu.ks@outlook.com)

