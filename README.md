# AVANTE SALAS

Sistema simples de reservas de salas com autenticação JWT e persistência em arquivos JSON.

## 📝 Sobre o projeto

Este projeto foi desenvolvido como desafio técnico para a Escola AVANTI. O objetivo é permitir que alunos e administradores possam fazer login, visualizar salas disponíveis, reservar horários e consultar reservas, tudo via API REST construída em Node.js e Express.

---

## 🚀 Como rodar o projeto

1. **Clone o repositório:**

   git clone https://github.com/seu-usuario/nome-do-repo.git
Acesse a pasta do projeto:


cd AVANTESALAS
Instale as dependências:


npm install
Inicie o servidor:


node src/server.js


⚡ Funcionalidades
Login: Autenticação com usuário e senha (JWT).

Verificação: Consulta de dados do usuário autenticado.

Listar salas: Retorna lista fixa de salas disponíveis.

Reservar sala: Permite reservas (alunos).

Consultar reservas: Permite admins consultarem todas as reservas.

Persistência: Usuários e reservas salvos em arquivos JSON.


🧑‍💻 Tecnologias utilizadas
Node.js

Express

jsonwebtoken

fs (File System)

JavaScript

Use o Insomnia ou Postman para testar as rotas.