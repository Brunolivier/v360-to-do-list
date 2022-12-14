'use strict';

// cria o banco de dados que é um array de objetos
let bancoDados = [];

const pegarBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const enviarBanco = (bancoDados) => localStorage.setItem('todoList', JSON.stringify(bancoDados));


/* funcao que cria a tarefa e cria também a label onde a tarefa vai ficar */
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

// funcao que atualiza a tela mostrando o que está dentro do banco de dados
const atualizarPagina = () => {
    limparTarefas();
    const bancoDados = pegarBanco();
    bancoDados.forEach((item, indice) => (criarItem(item.tarefa, item.status, indice)));

}

// funcao que vai inserir a tarefa quando for pressionado a tecla "enter"
const adicionarItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter') {
    const bancoDados = pegarBanco();
    bancoDados.push({'tarefa': texto, 'status': ''});
    enviarBanco(bancoDados); // envia para o banco de dados 
    atualizarPagina();
    evento.target.value = ''; // limpa a descrição onde digita o nome da tarefa após a tarefa ser criada
    }
}

// funcao que remove do banco de dados a tarefa que sera removida conforme o clique do usuário
const removerItem = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados.splice (indice, 1);
    enviarBanco(bancoDados);
    atualizarPagina();

}

// funcao que marca como "check" ou desmarca conforme o clique do usuário pelo índice
const atualizarItem = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados[indice].status = bancoDados[indice].status === '' ? 'checked' : '';
    enviarBanco(bancoDados);
    atualizarPagina();
}

// funcao que pega onde o usuário clicou
const clickItem = (evento) => {
    const elemento = evento.target;
    // remove a lista caso clicou no botao "X"
    if (elemento.type === 'button') {
        const indice = elemento.dataset.indice;
        removerItem(indice);
    }
    // marcar como "check" ou desmarca o "check"
    else if (elemento.type === 'checkbox') {
        const indice = elemento.dataset.indice;
        atualizarItem(indice);
    }
}

// captura a tecla pressionada pelo usuario e envia para a funcao adicionarLista
document.getElementById('newItem').addEventListener('keypress', adicionarItem);

// captura onde o usuário "clicou" e envia para o função clickLista
document.getElementById('todoList').addEventListener('click', clickItem);


atualizarPagina();