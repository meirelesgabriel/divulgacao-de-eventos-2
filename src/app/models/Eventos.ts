import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import Usuarios from './Usuarios';

// sobre a classe vem sempre o @Entity('') com o nome da tabela
@Entity('eventos')
class Eventos {
    // tipo uuid: o tipo que definimos para a id na nossa migration
    @PrimaryGeneratedColumn('uuid')
    id: string;

    // quando não especificamos um tipo para uma coluna, vai ser sempre varchar (= string), que é o padrão
    // como nome foi definido como varchar no nosso banco, podemos deixar em branco aqui
    @Column()
    dono_evento_id: string;

    @ManyToOne(() => Usuarios)
    @JoinColumn({ name: 'dono_evento_id' })
    dono_evento: Usuarios;

    @Column()
    nome: string;

    @Column()
    local: string;

    @Column()
    comentario: string;

    @Column()
    photo: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Eventos;
