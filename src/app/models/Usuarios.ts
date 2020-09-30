// importar o entity para representar a informação que será salva no banco de dados
// importar o primarygeneratedcolumn para nosso campo id que vai ser a chave primária
// e que vai ser gerada automaticamente
// importar o column para representar uma coluna simplesmente
// importar o CreateDateColumn para criar uma coluna que registra a data de criação da tabela
// importar o UpdateDateColumn para criar uma coluna que registra a data de atualização da tabela
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';

// sobre a classe vem sempre o @Entity('') com o nome da tabela
@Entity('usuarios')
class Usuarios {
    // tipo uuid: o tipo que definimos para a id na nossa migration
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // quando não especificamos um tipo para uma coluna, vai ser sempre varchar (= string), que é o padrão
    // como nome foi definido como varchar no nosso banco, podemos deixar em branco aqui
    @Column()
    nome: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Usuarios;
