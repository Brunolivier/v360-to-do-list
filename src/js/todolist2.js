'use strict';

// cria o banco de dados que é um array de objetos
let bancoDados = [];

const pegarBanco = () => JSON.parse(localStorage.getItem('todoListas')) ?? [];
const enviarBanco = (bancoDados) => localStorage.setItem('todoListas', JSON.stringify(bancoDados));


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
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

// funcao que atualiza a tela mostrando o que está dentro do banco de dados
const atualizarPaginaItem = () => {
    limparTarefas();
    const bancoDados = pegarBanco();
    bancoDados[getIndexLista(getIdLista())].items.forEach((item, indice) => (criarItem(item.tarefa, item.status, item.id)));

}

//  funcao para pegar o id da lista
const getIdLista = () => {
    let params = (new URL(document.location)).searchParams;
    let idLista = params.get('listId'); 
    return idLista;
}

// funcao para pegar o index da lista
const getIndexLista = (idLista) => {
    const bancoDados = pegarBanco();
    let indexLista = bancoDados.findIndex(list => 
        list.id == idLista);
    return indexLista;
}

// funcao para pegar o index do item-tarefa
const getIndexItem = (id) => {
    const bancoDados = pegarBanco();
    let indexItem =  bancoDados[getIndexLista(getIdLista())].items.findIndex(item => 
        item.id == id);
    return indexItem;
}



// funcao que vai inserir a tarefa quando for pressionado a tecla "enter"
const adicionarItem = (evento) => {
    const tecla = evento.key;
    const texto = evento.target.value;
    if (tecla === 'Enter') {
        const bancoDados = pegarBanco();
        let idLista = getIdLista();
        if(idLista){
            let id = setNewListId(bancoDados, idLista);
            let indexLista =  getIndexLista(idLista);
            bancoDados[indexLista].items.push({ 'id':id, 'tarefa': texto, 'status': '' });
            enviarBanco(bancoDados); // envia para o banco de dados 
            atualizarPaginaItem();
            evento.target.value = ''; // limpa a descrição onde digita o nome da tarefa após a tarefa ser criada
        } else {
            window.alert("ERRO");//tratar erro
        }
    }
}

// funcao que vai inserir um novo id para a lista
const setNewListId = (bancoDados, idLista) => {
    let id = Math.floor(Math.random() * 100);
    if(bancoDados[idLista]){
        bancoDados[idLista].forEach(dados => {
        if (dados.id == id) {
            id = Math.floor(Math.random() * 100);
        }
        });
    }
    return id
}

// funcao que remove do banco de dados a tarefa que sera removida conforme o clique do usuário
const removerItem = (indice) => {
    const bancoDados = pegarBanco();
    let index = getIndexItem(indice);
    bancoDados[getIndexLista(getIdLista())].items.splice(index, 1);
    enviarBanco(bancoDados);
    atualizarPaginaItem();

}

// funcao que marca como "check" ou desmarca conforme o clique do usuário pelo índice
const atualizarItem = (indice) => {
    const bancoDados = pegarBanco();
    let index = getIndexItem(indice);
    bancoDados[getIndexLista(getIdLista())].items[index].status = bancoDados[getIndexLista(getIdLista())].items[index].status == ''  ? 'checked' : '';
    enviarBanco(bancoDados);
    atualizarPaginaItem();
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


atualizarPaginaItem();