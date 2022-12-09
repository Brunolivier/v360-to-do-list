var task = [];


// função que gera os IDs
function idGenerator() {
    var timestamp = new Date ();

    var id = timestamp.getHours().toString() + 
            timestamp.getMinutes().toString() + 
            timestamp.getSeconds().toString() + 
            timestamp.getMilliseconds().toString()

    return id;

}

// função para pegar a descrição da tarefa
function createTask(){
    var taskDescription = document.getElementById("newTask").value;

    var task = {
        id: idGenerator(),
        data: {
            descrption: taskDescription
        }

    };

    tasks.push(task);

    updateScreen();


}

// funcao que atualiza a tela toda vez que uma task é criada
function updateScreen(){
    var list = "<ul>"
    tasks.forEach((task=>{
        list += "<li id-data=" + task.id + ">" + task.descrption + "</li>"
    }))

}