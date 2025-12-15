const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const listEl = document.getElementById('task-list');
const filterEl = document.getElementById('filter-select');
const clearBtn = document.getElementById('clear-btn');
const errorEl = document.getElementById('error');
const externalBtn = document.getElementById('load-external');
const externalList = document.getElementById('external-list');
const toggle = document.getElementById('dark-toggle');

function loadState(){
  const raw = localStorage.getItem('tasks');
  const pref = localStorage.getItem('pref');
  const tasks = raw ? JSON.parse(raw) : [];
  const preferences = pref ? JSON.parse(pref) : { filter: 'all', dark: false };
  toggle.checked = preferences.dark;
  document.documentElement.setAttribute('data-theme', preferences.dark ? 'dark' : 'light');
  filterEl.value = preferences.filter;
  return { tasks, preferences };
}

function saveState(tasks, preferences){
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('pref', JSON.stringify(preferences));
}

function render(tasks, filter){
  listEl.innerHTML = '';
  for(let i=0;i<tasks.length;i++){
    const t = tasks[i];
    if(filter === 'open' && t.done) continue;
    if(filter === 'done' && !t.done) continue;
    const li = document.createElement('li');
    const title = document.createElement('span');
    title.textContent = t.title;
    const actions = document.createElement('div');
    actions.className = 'actions';
    const doneBtn = document.createElement('button');
    doneBtn.className = 'btn';
    doneBtn.textContent = t.done ? 'Undo' : 'Done';
    const editBtn = document.createElement('button');
    editBtn.className = 'btn btn-secondary';
    editBtn.textContent = 'Edit';
    actions.appendChild(doneBtn);
    actions.appendChild(editBtn);
    li.appendChild(title);
    li.appendChild(actions);
    listEl.appendChild(li);

    doneBtn.addEventListener('click', () => {
      t.done = !t.done;
      saveState(tasks, state.preferences);
      render(tasks, state.preferences.filter);
    });

    editBtn.addEventListener('click', () => {
      const newTitle = prompt('Edit task', t.title);
      if(newTitle){
        t.title = newTitle;
        saveState(tasks, state.preferences);
        render(tasks, state.preferences.filter);
      }
    });
  }
}

async function loadExternal(){
  errorEl.hidden = true;
  externalList.innerHTML = '';
  try{
    const res = await fetch('https://dummyjson.com/todos?limit=6');
    if(!res.ok){ throw new Error('Failed to fetch'); }
    const data = await res.json();
    const items = data.todos.map(t => ({ title: t.todo, user: `User ${t.userId}` }));
    for(let i=0;i<items.length;i++){
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `<strong>${items[i].title}</strong><div>${items[i].user}</div>`;
      externalList.appendChild(card);
    }
  }catch(err){
    errorEl.textContent = 'Error loading external data.';
    errorEl.hidden = false;
  }
}

const state = loadState();
render(state.tasks, state.preferences.filter);

addBtn.addEventListener('click', () => {
  const text = input.value.trim();
  if(!text){ return; }
  state.tasks.push({ title: text, done: false });
  input.value = '';
  saveState(state.tasks, state.preferences);
  render(state.tasks, state.preferences.filter);
});

filterEl.addEventListener('change', () => {
  state.preferences.filter = filterEl.value;
  saveState(state.tasks, state.preferences);
  render(state.tasks, state.preferences.filter);
});

clearBtn.addEventListener('click', () => {
  state.tasks = [];
  saveState(state.tasks, state.preferences);
  render(state.tasks, state.preferences.filter);
});

externalBtn.addEventListener('click', loadExternal);

toggle.addEventListener('change', () => {
  state.preferences.dark = toggle.checked;
  document.documentElement.setAttribute('data-theme', toggle.checked ? 'dark' : 'light');
  saveState(state.tasks, state.preferences);
});
