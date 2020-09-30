import { Router } from 'express';

// importar o arquivo de rotas dos usuarios
import usuariosRouter from './usuarios.routes';
import eventosRouter from './eventos.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

// toda vez que for acessada uma rota que contenha /usuarios, vai ser executada automaticamente
// toda a configuração que está dentro de usuarios.routes
// o index.ts importa todos os arquivos de rotas
routes.use('/usuarios', usuariosRouter);
/* routes.get('/', (request, response) =>
    response.json({ message: 'Hello World.' }),
); */

routes.use('/eventos', eventosRouter);
routes.use('/sessions', sessionsRouter);

export default routes;
