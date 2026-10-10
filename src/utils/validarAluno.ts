type FormularioAluno = {
    nome: String;
    serie: String;
    responsavel: String;
    telefone: String;
};

export function validarAluno(formulario: FormularioAluno): string | null {
    //Normalizar os dados do formulário
    const nome = formulario.nome.trim();
    const serie = formulario.serie.trim();
    const responsavel = formulario.responsavel.trim();
    const telefone = formulario.telefone.trim();

    //validar os campos obrigatorios
    if (!nome) {
        return 'O campo nome é obrigatório.';
    }

    if (!serie) {
        return 'O campo série é obrigatório.';
    }

    if (!responsavel) {
        return 'O campo responsável é obrigatório.';
    }

    if (!telefone) {
        return 'O campo telefone é obrigatório.';
    }

    //3. Validar o formato do telefone
    if (!/^\d{9}$/.test(telefone)) {
        return 'O telefone deve conter exatamente 9 dígitos numéricos.';
    }
    return null;
}

