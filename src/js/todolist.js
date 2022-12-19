'use strict';

// cria o banco de dados que é um array de objetos
let bancoDados = [];
let list = [];
const pegarBanco = () => JSON.parse(localStorage.getItem('todoListas')) ?? [];
const enviarBanco = (bancoDados) => localStorage.setItem('todoListas', JSON.stringify(bancoDados));


/* funcao que cria a lista e cria também a label onde a lista vai ficar */
const criarLista = (lista, status, indice) => {
    const itemLista = document.createElement('label');
    itemLista.classList.add('itemLista');
    itemLista.innerHTML = `<input type="checkbox" ${status} data-indice=${indice}>
        <div>${lista}</div>
        <input type="submit" value="Tarefas" data-indice=${indice}>
        <input type="button" value="X" data-indice=${indice}>   
        `
    document.getElementById('todoListas').appendChild(itemLista); // adiciona um item(lista)
}


const limparListas = () => {
    const todoListas = document.getElementById('todoListas');
    while (todoListas.firstChild) {
        todoListas.removeChild(todoListas.lastChild)
    }
}


// funcao que atualiza a tela mostrando o que está dentro do banco de dados
const atualizarPagina = () => {
    limparListas();
    const bancoDados = pegarBanco();
    bancoDados.forEach((itemLista, indice) => criarLista(itemLista.lista, itemLista.statusLista, itemLista.id));
}

// funcao que vai inserir a lista quando for pressionado a tecla "enter"
const adicionarLista = (evento) => {
    const teclaLista = evento.key;
    const textoLista = evento.target.value;
    if (teclaLista === 'Enter') {
        const bancoDados = pegarBanco();
        let id = Math.floor(Math.random() * 100);
        bancoDados.forEach(dados => {
            if (dados.id == id) {
                id = Math.floor(Math.random() * 100); // cria um id de número inteiro para a lista
            }
        });
        bancoDados.push({ 'id': id, 'lista': textoLista, 'statusLista': '', 'items': []});
        enviarBanco(bancoDados); // envia para o banco de dados 

        atualizarPagina();
        evento.target.value = ''; // limpa a descrição onde digita o nome da lista após a lista ser criada
    }
}


// pega o inde   para remover e atualizar a lista
const getIndexLista = (idLista) => {
    const bancoDados = pegarBanco();
    let indexLista = bancoDados.findIndex(list => 
        list.id == idLista);
    return indexLista;
}


// funcao que remove do banco de dados a lista que sera removida conforme o clique do u(indice)
const removerLista = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados.splice(getIndexLista(indice), 1);
    enviarBanco(bancoDados);
    atualizarPagina();
}


// funcao que marca como "check" ou desmarca conforme o clique do usuário pelo índice
const atualizarLista = (indice) => {
    const bancoDados = pegarBanco();
    bancoDados[getIndexLista(indice)].statusLista = bancoDados[getIndexLista(indice)].statusLista === '' ? 'checked' : '';
    enviarBanco(bancoDados);
    atualizarPagina();

}


// funcao que pega onde o usuário clicou
const clickLista = (evento) => {
    const elementoLista = evento.target;
    // remove a lista caso clicou no botao "X"
    if (elementoLista.type === 'button') {
        const indiceLista = elementoLista.dataset.indice;
        removerLista(indiceLista);
    }
    // vai para a pagina com as tarefas
    if (elementoLista.type === 'submit') {
        let newPath = window.location.href.replace('index.html','index2.html')
        let url = new URL(newPath+'?listId='+elementoLista.dataset.indice);
        window.location.href = url;
    }
    // marcar como "check" ou desmarca o "check"
    else if (elementoLista.type === 'checkbox') {
        const indice = elementoLista.dataset.indice;
        atualizarLista(indice);
    }
}


// captura a tecla pressionada pelo usuario e envia para a funcao adicionarLista
document.getElementById('newList').addEventListener('keypress', adicionarLista);

// captura onde o usuário "clicou" e envia para o função clickLista
document.getElementById('todoListas').addEventListener('click', clickLista);


atualizarPagina();