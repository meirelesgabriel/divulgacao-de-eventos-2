import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import multer from 'multer';

import UsuariosController from '../app/controllers/UsuariosController';
import Usuarios from '../app/models/Usuarios';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import uploadConfig from '../config/upload';
// import AvatarUsuariosController from '../app/controllers/AvatarUsuariosController';

const usuariosRouter = Router();
// const upload = multer(uploadConfig);

// criar um usuário
usuariosRouter.post('/', async (request: Request, response: Response) => {
    try {
        const { nome, email, password } = request.body;

        const usuariosController = new UsuariosController();

        const user = await usuariosController.store({
            nome,
            email,
            password,
        });
        delete user.password;

        return response.json(user);
    } catch (erro) {
        return response.status(400).json({ error: erro.message });
    }
});

// listar todos os usuários
usuariosRouter.get(
    '/',
    ensureAuthenticated,
    async (request: Request, response: Response) => {
        const usuariosRepositorio = getRepository(Usuarios);
        const user = await usuariosRepositorio.find();
        // console.log(request.user);
        user.forEach(u => {
            delete u.password;
        });
        return response.json(user);
    },
);

// listar um único usuário
usuariosRouter.get('/:id', ensureAuthenticated, async (request, response) => {
    const usuariosRepositorio = getRepository(Usuarios);
    const { id } = request.params;
    const user = await usuariosRepositorio.findOne(id);
    return response.json(user);
});

// excluir um usuário
usuariosRouter.delete(
    '/:id',
    ensureAuthenticated,
    async (request, response) => {
        const usuariosRepositorio = getRepository(Usuarios);
        const { id } = request.params;
        await usuariosRepositorio.delete(id);
        return response.send();
    },
);

export default usuariosRouter;
