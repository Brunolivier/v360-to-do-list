let bancoDados = [
    {'tarefa':'Estudar JS', 'status': ''},
    {'tarefa':'Estudar CSS', 'status': ''},
    {'tarefa':'Estudar HTML', 'status': 'checked'}
];


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
    bancoDados.forEach((item, indice) => criarItem(item.tarefa, item.status, indice));
}

const adicionarItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter') {
    bancoDados.push({'tarefa': texto, 'status': ''});
    atualizarPagina();
    evento.target.value = ''; //limpa a tarefa
    }
}

const removerItem = (indice) => {
    bancoDados.splice (indice, 1);
    atualizarPagina();

}


const atualizarItem = (indice) => {
    bancoDados[indice].status = bancoDados[indice].status === '' ? 'checked' : '';
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