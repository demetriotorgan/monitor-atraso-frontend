import axios from "axios";

export interface NovoAluno{
    nome: string;
    serie: string;
    responsavel: string;
    telefone_responsavel: string;
}

const api = axios.create({
    baseURL: 'https://api.134.65.254.177.nip.io/',
    timeout: 5000,
});

export async function getStatus() {
    const response = await api.get('/status');
    return response.data;
};

export async function salvarAluno(aluno: NovoAluno) {
    const response = await api.post('/alunos/', aluno);
    return response.data;
}

export async function getAlunos() {
    const response = await api.get('/alunos/');
    return response.data;
}

