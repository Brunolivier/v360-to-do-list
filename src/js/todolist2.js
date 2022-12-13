'use strict';

let bancoDados = [];

const pegarBanco = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const enviarBanco = (bancoDados) => localStorage.setItem('todoList', JSON.stringify(bancoDados));


/*
const criarLista = (lista, statusLista, indiceLista) => {
    const itemLista = document.createElement('label');
    itemLista.classList.add('item');
    itemLista.innerHTML = `<input type="checkbox" ${statusLista} data-indice=${indiceLista}>
        <div>${lista}</div>
        <input type="button" value="X" data-indice=${indiceLista}>
        `
    document.getElementById('todoListas').appendChild(itemLista);
}
*/


const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('item');
    item.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
        `
    document.getElementById('todoList').appendChild(item);
}

/*
const limparListas = () => {
    const todoListas = document.getElementById('todoListas');
    while(todoListas.firstChild) {
        todoListas.removeChild(todoListas.lastChild)
    }
}
*/

const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}


const atualizarPagina = () => {
    //limparListas();
    limparTarefas();
    const bancoDados = pegarBanco();
    //bancoDados.forEach((item) => (criarLista(item.lista, item.statusLista, item.indiceLista)));
    bancoDados.forEach((item, indice) => (criarItem(item.tarefa, item.status, indice)));
    //bancoDados.forEach((itemLista,item) => (criarLista(itemLista.tarefa, itemLista.status, itemLista.indiceLista),criarItem(item.tarefa, item.status, item.indice)));
    //bancoDados.forEach((itemLista) => (criarLista(itemLista.tarefa, itemLista.status, itemLista.indiceLista)));
}

/*
const adicionarLista = (evento) => {
    const teclaLista = evento.key;
    const textoLista = evento.target.value;
    if(teclaLista === 'Enter') {
    const bancoDados = pegarBanco();
    bancoDados.push({'lista': textoLista, 'status': ''});
    enviarBanco(bancoDados);
    atualizarPagina();
    evento.target.value = ''; //limpa descrição onde cria a lista
    }
}
*/

const adicionarItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if(tecla === 'Enter') {
    const bancoDados = pegarBanco();
    bancoDados.push({'tarefa': texto, 'status': ''});
    enviarBanco(bancoDados);
    atualizarPagina();
    evento.target.value = ''; //llimpa descrição onde cria a tarefa
    }
}

/*
const removerLista = (indiceLista) => {
    const bancoDados = pegarBanco();
    bancoDados.splice (indiceLista, 1);
    enviarBanco(bancoDados);
    atualizarPagina();

}

*/
const removerItem = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados.splice (indice, 1);
    enviarBanco(bancoDados);
    atualizarPagina();

}

/*

const atualizarLista = (indiceLista) => {
    const bancoDados = pegarBanco();
    bancoDados[indiceLista].statusLista = bancoDados[indiceLista].statusLista === '' ? 'checked' : '';
    enviarBanco(bancoDados);
    atualizarPagina();

}

*/


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

/*
const clickItemLista = (evento) => {
    const elementoLista = evento.target;
    if (elementoLista.type === 'button') {
        const indiceLista = elementoLista.dataset.indiceLista;
        removerItem(indiceLista);
    }
    else if (elementoLista.type === 'checkbox') {
        const indiceLista = elemento.dataset.indiceLista;
        atualizarItem(indiceLista);
    }
}

*/

//document.getElementById('newList').addEventListener('keypress', adicionarLista);
document.getElementById('newItem').addEventListener('keypress', adicionarItem);
document.getElementById('todoList').addEventListener('click', clickItem);
//document.getElementById('todoListas').addEventListener('click', clickItemLista);

atualizarPagina();