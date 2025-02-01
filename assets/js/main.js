document.addEventListener('DOMContentLoaded', function() {
    const seletor = document.getElementById('seletor-tema');
    const temaEstilo = document.getElementById('tema-estilo');

    // Função para definir o tema inicial com base no localStorage ou tema padrão
    function definirTema() {
        const temaSelecionado = localStorage.getItem('temaSelecionado');
        
        // Se houver um tema armazenado no localStorage, aplique esse tema
        if (temaSelecionado) {
            temaEstilo.href = temaSelecionado;
            seletor.value = temaSelecionado;
        } else {
            // Caso contrário, defina o tema padrão
            temaEstilo.href = "./css/padrao-styles.css"; // Caminho do tema padrão
            seletor.value = "./css/padrao-styles.css"; // Caminho do tema padrão
        }
    }

    // Chama a função para garantir que o tema seja carregado na página
    definirTema();

    // Atualiza o tema quando o usuário muda a seleção
    seletor.addEventListener('change', function () {
        const novoTema = this.value;
        temaEstilo.href = novoTema;
        localStorage.setItem('temaSelecionado', novoTema); // Armazena o novo tema no localStorage
    });
});

const inputTask = document.querySelector('.input-task');
const btnTask = document.querySelector('.btn-task');
const tasks = document.querySelector('.tasks');

function createLi() {
    const li = document.createElement('li');
    return li;
}

inputTask.addEventListener('keypress', function(e) {
    if (e.keyCode === 13) {
        if (!inputTask.value) return;
        createTask(inputTask.value);
    }
});

function cleanInput() {
    inputTask.value = '';
    inputTask.focus();
}

function createButtonClean(li) {
    li.innerText += " ";
    const cleanButton = document.createElement('button');
    cleanButton.innerText = 'Apagar';
    cleanButton.setAttribute('class', 'apagar');
    cleanButton.setAttribute('title', 'Apagar esta tarefa');
    li.appendChild(cleanButton);
}

function createTask(textInput) {
    const li = createLi();
    li.innerText = textInput;
    tasks.appendChild(li);
    cleanInput();
    createButtonClean(li);
    saveTasks();
}

btnTask.addEventListener('click', function() {
    if (!inputTask.value) return;
    createTask(inputTask.value);
});

document.addEventListener('click', function(e) {
    const el = e.target;
    if (el.classList.contains('apagar')) {
        el.parentElement.remove();
        saveTasks();
    }
});

function saveTasks() {
    const liTasks = tasks.querySelectorAll('li');
    const taskList = [];

    for (let task of liTasks) {
        let textTask = task.innerText;
        textTask = textTask.replace('Apagar', '').trim();
        taskList.push(textTask);
    }

    const jsonTask = JSON.stringify(taskList);
    localStorage.setItem('tasks', jsonTask);
}

function addSavedTasks() {
    const tasks = localStorage.getItem('tasks');
    const tasskList = JSON.parse(tasks);
    
    for (let task of tasskList) {
        createTask(task);
    }
}
addSavedTasks();
