


let bancoDados = [
    {'tarefa':'Estudar JS', 'status': ''},
    {'tarefa':'Estudar CSS', 'status': ''},
    {'tarefa':'Estudar HTML', 'status': 'checked'}
];


const criarItem = (tarefa, status) => {
    const item = document.createElement('label');
    item.classList.add('item');
    item.innerHTML = 
        `
        <input type="checkbox" ${status}>
        <div>${tarefa}</div>
        <input type="button" value="">
        `
    document.getElementById('todoList').appendChild(item);
}



const atualizarPagina = () => {
    criarItem('teste1');
}

atualizarPagina();