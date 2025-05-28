## Tecnologias
- Node.js (Para todo o Back-End)
- MySQL (Biblioteca de MySQLpara Node.js)
- Express (Server Node.js)
- Multer (Para lidar com envio de imagens por Node.js)

## Requisitos

Para executar esse projeto irá precisar de [Node.js](https://nodejs.org/pt)

## Instalação

Com o node ja instalado clone o projeto no seu terminal

```bash
//Para Clonar o Projeto
git clone git https://github.com/guilhermesilva161/piloto_tatouile.git

```

Após isso baixe as bibliotecas com o node

```bash
    npm install mysql2
    npm install express
    npm install multer

```


Crie o Banco de dados com o Script localizado na pasta src/database/script.sql

No proprio script tem os inserts a serem feitos para fazer login


## Execução

Agora configure o banco de dados de acordo como você abriu em sua máquina, após feitas configurações rode o projeto.

Para rodar o do projeto, use o comando:

```bash
    npm start
```

Agora so abrir o navegador: [localhost:3000](http://localhost:3000)