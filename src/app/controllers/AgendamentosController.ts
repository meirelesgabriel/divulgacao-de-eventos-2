import { getRepository } from 'typeorm';
import { startOfHour, parseISO } from 'date-fns';
import Agendamentos from '../models/Agendamentos';

interface Request {
    prestador_servico_id: string;
    data: string;
}

class AgendamentosController {
    public async store({
        prestador_servico_id,
        data,
    }: Request): Promise<Agendamentos> {
        const dataPassada = startOfHour(parseISO(data));
        const agendamentosRepository = getRepository(Agendamentos);
        const encontrarAgendamentoMesmaData = await agendamentosRepository.findOne(
            { where: { data: dataPassada } },
        );
        const encontrarPrestador = await agendamentosRepository.findOne({
            where: { prestador_servico_id },
        });

        if (encontrarAgendamentoMesmaData && encontrarPrestador) {
            throw new Error('Agendamento já cadastrado para este horário');
        }
        const agendamento = agendamentosRepository.create({
            prestador_servico_id,
            data: dataPassada,
        });
        await agendamentosRepository.save(agendamento);
        return agendamento;
    }
}

export default AgendamentosController;
