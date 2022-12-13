'use strict';

let bancoDados = [];

const pegarBanco = () => JSON.parse(localStorage.getItem('todoListas')) ?? [];
const enviarBanco = (bancoDados) => localStorage.setItem('todoListas', JSON.stringify(bancoDados));



const criarLista = (lista, status, indice) => {
    const itemLista = document.createElement('label');
    itemLista.classList.add('itemLista');
    itemLista.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
        <div>${lista}</div>
        <input type="submit" value="Tarefas" data-indice=${indice}>
        <input type="button" value="X" data-indice=${indice}>
        
        `
    document.getElementById('todoListas').appendChild(itemLista);
}

/*
const criarItem = (tarefa, status, indice) => {
    const item = document.createElement('label');
    item.classList.add('item');
    item.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
        <div>${tarefa}</div>
        <input type="button" value="X" data-indice=${indice}>
        `
    document.getElementById('todoList').appendChild(item);
}
*/

const limparListas = () => {
    const todoListas = document.getElementById('todoListas');
    while(todoListas.firstChild) {
        todoListas.removeChild(todoListas.lastChild)
    }
}

/*
const limparTarefas = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}
*/

const atualizarPagina = () => {
    limparListas();
    //limparTarefas();
    const bancoDados = pegarBanco();
    bancoDados.forEach((itemLista, indice) => criarLista(itemLista.lista, itemLista.status, indice));
    //bancoDados.forEach((item) => (criarItem(item.tarefa, item.status, item.indice)));
    //bancoDados.forEach((itemLista,item) => (criarLista(itemLista.tarefa, itemLista.status, itemLista.indiceLista),criarItem(item.tarefa, item.status, item.indice)));
    //bancoDados.forEach((itemLista) => (criarLista(itemLista.tarefa, itemLista.status, itemLista.indiceLista)));
}


const adicionarLista = (evento) => {
    const teclaLista = evento.key;
    const textoLista = evento.target.value;
    if(teclaLista === 'Enter') {
    const bancoDados = pegarBanco();
    bancoDados.push({'lista': textoLista, 'statusLista': ''});
    enviarBanco(bancoDados);
    atualizarPagina();
    evento.target.value = ''; //limpa a descrição onde digita o nome da lista após a lista ser criada
    }
}

/*
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
*/

const removerLista = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados.splice(indice, 1);
    enviarBanco(bancoDados);
    atualizarPagina();

}

/*
const removerItem = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados.splice (indice, 1);
    enviarBanco(bancoDados);
    atualizarPagina();

}

*/


const atualizarLista = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados[indice].status = bancoDados[indice].status === '' ? 'checked' : '';
    enviarBanco(bancoDados);
    atualizarPagina();

}


/*
const atualizarItem = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados[indice].status = bancoDados[indice].status === '' ? 'checked' : '';
    enviarBanco(bancoDados);
    atualizarPagina();

}
*/


const clickLista = (evento) => {
    const elementoLista = evento.target;
    if (elementoLista.type === 'button') {
        const indiceLista = elementoLista.dataset.indice;
        removerLista(indiceLista);
    }
    if (elementoLista.type === 'submit') {
        window.location.href = 'index2.html'
       ;
    }
    else if (elementoLista.type === 'checkbox') {
        const indice = elementoLista.dataset.indice;
       atualizarLista(indice);
    }
}

/*
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
*/

document.getElementById('newList').addEventListener('keypress', adicionarLista);
//document.getElementById('newItem').addEventListener('keypress', adicionarItem);
document.getElementById('todoListas').addEventListener('click', clickLista);
//document.getElementById('todoList').addEventListener('click', clickItem);



atualizarPagina();