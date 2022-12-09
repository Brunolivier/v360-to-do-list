let bancoDados = [
    {'tarefa':'Estudar JS', 'status': ''},
    {'tarefa':'Estudar CSS', 'status': ''},
    {'tarefa':'Estudar HTML', 'status': 'checked'}
];


const criarItem = (tarefa, status = '') => {
    const item = document.createElement('label');
    item.classList.add('item');
    item.innerHTML = `<input type="checkbox" ${status}>
        <div>${tarefa}</div>
        <input type="button" value="">
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
    bancoDados.forEach(item => criarItem(item.tarefa, item.status));
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

document.getElementById('newItem').addEventListener('keypress', adicionarItem);

atualizarPagina();