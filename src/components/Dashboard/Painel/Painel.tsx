import { UserRoundPlus, ClockAlert, ClipboardList, ListTodo } from 'lucide-react'

import NavCard from '../../NavCard/NavCard'
import './Painel.css'
import Badge from '../Badge/Badge'

const Painel = () => {
    return (
        <div className='painel-container'>
            <h3>Monitor de Atrasos</h3>
            <Badge />
            <NavCard
                nome="Regisrar atrasos"
                icone={ClockAlert}
                to="/atrasos/novo"
            />
            <NavCard
                nome="Listar atrasos"
                icone={ClipboardList}
                to="/atrasos"
            />
            <NavCard
                nome="Cadastrar aluno"
                icone={UserRoundPlus}
                to="/alunos/novo"
            />
            <NavCard
                nome="Ver alunos"
                icone={ListTodo}
                to="/alunos"
            />            
        </div>
    )
}

export default Painel