const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const darkModeToggle = document.getElementById('darkModeToggle');

let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all';

function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function renderTodos() {
  list.innerHTML = '';

  let filtered = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');

    // Checkbox for completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.style.marginRight = '12px';
    checkbox.addEventListener('change', () => {
      todos[index].completed = checkbox.checked;
      saveTodos();
      renderTodos();
    });

    // Task description span
    const descSpan = document.createElement('span');
    descSpan.textContent = todo.text;
    descSpan.classList.add('task-desc');
    descSpan.style.flex = '1';
    descSpan.style.marginRight = '10px';
    // if (todo.completed) descSpan.classList.add('completed');

    // Edit button (icon)
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.title = 'Edit task';
    editBtn.style.marginRight = '6px';
    editBtn.onclick = () => {
      // Replace span with input for editing
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = todo.text;
      inputEdit.className = 'edit-input';
      inputEdit.style.flex = '1';
      inputEdit.style.marginRight = '10px';
      li.replaceChild(inputEdit, descSpan);
      inputEdit.focus();
      // Save on blur or Enter
      function saveEdit() {
        todos[index].text = inputEdit.value.trim();
        saveTodos();
        renderTodos();
      }
      inputEdit.addEventListener('blur', saveEdit);
      inputEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          inputEdit.blur();
        }
      });
    };

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodos();
    };

    // Button group
    const btnGroup = document.createElement('div');
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);

    li.appendChild(checkbox);
    li.appendChild(descSpan);
    li.appendChild(btnGroup);
    list.appendChild(li);
  });
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    input.value = '';
  }
});

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    renderTodos();
  });
});

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkModeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Initial render
renderTodos();
