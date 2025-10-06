# Desafio Técnico Zoppy - Desenvolvedor Jr.
Este projeto foi desenvolvido como parte do Desafio Técnico para a vaga de Desenvolvedor Jr. na Zoppy. O objetivo é criar uma aplicação CRUD completa (Create, Read, Update, Delete) com persistência de dados e uma interface web moderna, utilizando o stack principal da empresa.

## Tema Escolhido
O CRUD foi implementado para o tema **Pedidos (Orders)** e para **Clientes/Usuários (Users)** como desafio extra. Também fiz questão de criar uma implementação simples de autenticação e autorização de usuários para fazer o flow da aplicação fazer mais sentido. 

## Estrutura do Projeto
No diretório principal da aplicação se encontra a aplicação Angular, e dentro do diretório `server` se encontra o backend feito em Nest.

## Instruções de Execução
Siga os passos abaixo para colocar a aplicação em funcionamento:
1. Clone esse repositório para sua máquina.
2. Instale as dependencias do npm (`npm install`) tanto no diretório principal (aplicação Angular) quanto no diretório `server` (backend Nest).
3. Certifique-se de ter o MySql instalado, e crie um novo schema.
4. Crie um arquivo `.env` dentro do diretório `server` com os seguintes campos, e preencha-os com as informações necessárias:
  ```
  DB_USERNAME={USUARIO_MYSQL}
  DB_PASSWORD={SENHA_MYSQL}
  DB_NAME={NOME_SCHEMA_CRIADO_ANTERIORMENTE}
  DB_PORT=3306
  ```
5. Dentro do diretório `server` execute o comando `npm run start:dev` para iniciar o backend em Nest.
6. No diretório principal, execute o comando `npm run start` para iniciar o front-end em Angular.
7. Pronto! Agora é só acessar a url `localhost:4200` e testar a aplicação.


## Checklist das Regras Gerais
- [x] Backend feito com Node.js, utilizando NestJS na versão 10.
- [x] Dados armazenados de forma persistente em um banco de dados.
- [x] Frontend feito com Angular 19.
- [x] Pelo menos duas telas desenvolvidas no front-end, sendo obrigatoriamente uma de listagem dos registros.

## Checklist dos Desafios Extras
- [x] Utilizar o conceito de Observables do RxJS para controle de estados.
- [x] Utilizar o TailwindCSS para estilização dos componentes HTML.
- [x] Desenvolver com abordagem mobile first.
- [ ] Criar filtro para a listagem do CRUD.
- [ ] Criar testes unitários em Jest com pelo menos 50% de cobertura de código.
- [ ] Utilizar o Docker para conteinerização da aplicação junto a um banco de dados relacional.
- [x] Utilizar efetivamente um banco de dados para armazenar e consultar os dados do CRUD.
- [ ] Propor e implementar uma solução para limitar o acesso a grandes volumes de dados, como paginação, filtros ou limites de resposta.
