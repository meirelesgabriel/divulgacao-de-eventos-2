import express from 'express';
import routes from './routes';
import './database';

// executar a função do express e armazenar na variável app:
const app = express();
// para permitir que se enviem requisições em formato json para o servidor:
app.use(express.json());
// definir onde vai carregar as rotas:
app.use(routes);

// definir uma rota (a principal):
// sempre que for acessada essa rota, será retornada a mensagem Hello World:
// app.get('/', (request, response) => response.json({ message: 'Hello World' }));

// levantar/iniciar o servidor, definindo uma porta:
app.listen(3333, () => {
    console.log('Servidor rodando na porta 3333.');
});
