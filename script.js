// Get references to DOM elements
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filterButtons = document.querySelectorAll('.filter-btn');
const darkModeToggle = document.getElementById('darkModeToggle');

// Helper to generate unique IDs
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// Load todos from localStorage or initialize empty array
let todos = JSON.parse(localStorage.getItem('todos')) || [];
let filter = 'all'; // Current filter state

// Save todos to localStorage
function saveTodos() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

// Render the list of todos based on current filter
function renderTodos() {
  list.innerHTML = '';

  // Filter todos based on selected filter
  let filtered = todos.filter(todo => {
    if (filter === 'completed') return todo.completed;
    if (filter === 'active') return !todo.completed;
    return true;
  });

  // Show message if no tasks found
  if (filtered.length === 0) {
    const emptyMsg = document.createElement('li');
    emptyMsg.textContent = 'No tasks found';
    emptyMsg.style.textAlign = 'center';
    emptyMsg.style.color = '#888';
    emptyMsg.style.padding = '24px 0';
    emptyMsg.style.fontWeight = 'bold';
    emptyMsg.setAttribute('aria-live', 'polite');
    list.appendChild(emptyMsg);
    return;
  }

  filtered.forEach((todo) => {
    const li = document.createElement('li');
    if (todo.completed) li.classList.add('completed');

    // Checkbox for completion
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.style.marginRight = '12px';
    checkbox.setAttribute('aria-label', 'Mark task as completed');
    // Toggle completion status on change
    checkbox.addEventListener('change', () => {
      const idx = todos.findIndex(t => t.id === todo.id);
      if (idx !== -1) {
        todos[idx].completed = checkbox.checked;
        saveTodos();
        renderTodos();
      }
    });

    // Task description span
    const descSpan = document.createElement('span');
    descSpan.textContent = todo.text;
    descSpan.classList.add('task-desc');
    descSpan.style.flex = '1';
    descSpan.style.marginRight = '10px';

    // Edit button (icon)
    const editBtn = document.createElement('button');
    editBtn.innerHTML = '✏️';
    editBtn.title = 'Edit task';
    editBtn.style.marginRight = '6px';
    editBtn.setAttribute('aria-label', 'Edit task');
    // Disable edit if completed
    if (todo.completed) {
      editBtn.disabled = true;
      editBtn.style.opacity = '0.5';
      editBtn.style.cursor = 'not-allowed';
    }
    // Edit task on click
    editBtn.onclick = () => {
      if (editBtn.disabled) return;
      // Replace span with input for editing
      const inputEdit = document.createElement('input');
      inputEdit.type = 'text';
      inputEdit.value = todo.text;
      inputEdit.className = 'edit-input';
      inputEdit.style.flex = '1';
      inputEdit.style.marginRight = '10px';
      li.replaceChild(inputEdit, descSpan);
      // Change edit button to save text
      editBtn.textContent = 'Save';
      editBtn.title = 'Save task';
      editBtn.setAttribute('aria-label', 'Save task');
      editBtn.disabled = false;
      editBtn.style.opacity = '1';
      editBtn.style.cursor = 'pointer';
      inputEdit.focus();
      // Save on blur or Enter or save button click
      function saveEdit() {
        const idx = todos.findIndex(t => t.id === todo.id);
        if (idx !== -1) {
          todos[idx].text = inputEdit.value.trim();
          saveTodos();
          renderTodos();
        }
      }
      inputEdit.addEventListener('blur', saveEdit);
      inputEdit.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          inputEdit.blur();
        }
      });
      editBtn.onclick = saveEdit;
    };

    // Delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '🗑';
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    // Delete task on click
    deleteBtn.onclick = () => {
      const idx = todos.findIndex(t => t.id === todo.id);
      if (idx !== -1) {
        todos.splice(idx, 1);
        saveTodos();
        renderTodos();
      }
    };

    // Button group for edit and delete
    const btnGroup = document.createElement('div');
    btnGroup.style.display = 'flex';
    btnGroup.style.gap = '4px';
    btnGroup.appendChild(editBtn);
    btnGroup.appendChild(deleteBtn);

    // Append elements to list item
    li.appendChild(checkbox);
    li.appendChild(descSpan);
    li.appendChild(btnGroup);
    list.appendChild(li);
  });
}

// Handle form submission to add new todo
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (text !== '') {
    todos.push({ id: generateId(), text, completed: false });
    saveTodos();
    renderTodos();
    input.value = '';
  }
});

// Handle filter button clicks
filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    filter = btn.dataset.filter;
    renderTodos();
  });
});

// Handle dark mode toggle
// Toggles the 'dark' class on the body and updates button text

darkModeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  darkModeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Initial render of todos on page load
renderTodos();
