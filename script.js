const ownerPassword = "Win-owner";
const adminPassword = "Win-admin";

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === ownerPassword) {
        showOwnerPanel();
    } else if (password === adminPassword) {
        showAdminPanel();
    } else {
        alert("Incorrect password!");
    }
}

function showOwnerPanel() {
    document.getElementById('login-panel').classList.add('hidden');
    document.getElementById('owner-panel').classList.remove('hidden');
    fetchVisitorCount();
}

function showAdminPanel() {
    document.getElementById('login-panel').classList.add('hidden');
    document.getElementById('admin-panel').classList.remove('hidden');
    loadTasks();
}

function fetchVisitorCount() {
    fetch('https://win.monkegamer.com/api/visitor-count') // Assuming this endpoint returns the visitor count
        .then(response => response.json())
        .then(data => {
            document.getElementById('visitor-count').innerText = data.count;
        })
        .catch(error => {
            document.getElementById('visitor-count').innerText = "Error fetching visitor count.";
            console.error('Error fetching visitor count:', error);
        });
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.done;
        checkbox.onchange = () => saveTasks();
        li.appendChild(checkbox);
        li.appendChild(document.createTextNode(task.text));
        taskList.appendChild(li);
    });
}

function addTask() {
    const newTaskInput = document.getElementById('new-task');
    const taskText = newTaskInput.value.trim();
    if (taskText) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: taskText, done: false });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        newTaskInput.value = '';
        loadTasks();
    }
}

function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        const text = li.textContent;
        const done = li.querySelector('input').checked;
        tasks.push({ text, done });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
