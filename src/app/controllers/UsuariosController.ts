// vamos importar getRepository do typeorm
// com o getRepository vinculado ao model,
// a gente vai ter acesso a todos os métodos como find, findone, save, remove

import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import ensureAuthenticated from '../../middlewares/ensureAuthenticated';

import Usuarios from '../models/Usuarios';

interface Request {
    nome: string;
    email: string;
    password: string;
}

// o controller também será uma classe
class UsuariosController {
    // agora vamos declarar um método público e assíncrono
    // erro: nome, email e email não foram definidos (has an 'any' type)
    // solução: criar uma interface e então definir que esses atributos são do tipo Request (nome dado a nossa interface - conferir acima)
    // como é assíncrona, retorna uma promise do tipo Usuarios (classe do model)
    public async store({ nome, email, password }: Request): Promise<Usuarios> {
        // criamos uma constante e atribuímos a ela a função getRepository com o model Usuarios como parâmetro
        // depois disso, usuariosRepository vai ter acesso a todos os métodos que mencionamos mais acima
        const usuariosRepository = getRepository(Usuarios);

        // primeira regra: verificar se o e-mail já foi cadastrado anteriormente
        // findOne: retorna true caso encontre pelo menos um e-mail igual ao que recebeu como parâmetro em store
        // findOne: retorna falsa caso não encontre nenhum e-mail igual ao que recebeu como parÂmetro na função store
        const verificaUsuarioExiste = await usuariosRepository.findOne({
            where: { email },
        });

        // se verificaUsuarioExiste for verdadeiro
        if (verificaUsuarioExiste) {
            throw new Error('Endereço de email já cadastrado');
        }
        // (senha, saldo)
        const hashedPassword = await hash(password, 8);

        // caso verificaUsuario seja falso, ou seja, ainda não tenha sido cadastrado o e-mail que estamos verificando
        // criamos um objeto user para receber o retorno da função de criação de uma linha na tabela. Esse objeto vai conter as mesmas informações: nome, email e password.
        const user = usuariosRepository.create({
            nome,
            email,
            password: hashedPassword,
        });

        // uma vez que o objeto foi criado, a gente pode salvá-lo no banco de dados
        await usuariosRepository.save(user);

        // e agora retornamos para o arquivo de rotas o objeto user
        return user;
    }
}

export default UsuariosController;
