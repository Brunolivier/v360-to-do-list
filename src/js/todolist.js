let bancoDados = [
];

const pegarBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const enviarBanco = (bancoDados) => localStorage.setItem('todoList', JSON.stringify(bancoDados));


const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('item');
    item.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
        `
    document.getElementById('todoList').appendChild(item);
}

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

const atualizarPagina = () => {
    limparTarefas();
    const bancoDados = pegarBanco();
    bancoDados.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const adicionarItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter') {
    const bancoDados = pegarBanco();
    bancoDados.push({'tarefa': texto, 'status': ''});
    enviarBanco(bancoDados);
    atualizarPagina();
    evento.target.value = ''; //limpa a tarefa
    }
}

const removerItem = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados.splice (indice, 1);
    enviarBanco(bancoDados);
    atualizarPagina();

}


const atualizarItem = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados[indice].status = bancoDados[indice].status === '' ? 'checked' : '';
    enviarBanco(bancoDados);
    atualizarPagina();

}


const clickItem = (evento) => {
    const elemento = evento.target;
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }
    else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

document.getElementById('newItem').addEventListener('keypress', adicionarItem);
document.getElementById('todoList').addEventListener('click', clickItem);


atualizarPagina();