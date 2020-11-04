const addBtn = document.getElementById('add');
const themeBtn = document.getElementById('theme');
const noteContainer = document.querySelector('.note-container')

const [_, notes] = checkStorage();

document.addEventListener('DOMContentLoaded', loadPreviousState)
function loadPreviousState() {
  const [dark, notes] = checkStorage();
  if (dark) {
    document.body.classList.add('dark')
  }
  notes.map((item) => {
    const note = document.createElement('div')
    note.classList.add('note')
    note.innerHTML = `
<div class="note-tools">
 <button class="edit"><i class="fas fa-edit"></i></button>
 <button class="delete"><i class="fas fa-trash"></i></button>
</div>
<div class="display">

</div>
<textarea placeholder="Enter your notes here (markdown allowed)" class="hidden"></textarea>
`
    const editBtn = note.querySelector('.edit');
    const deleteBtn = note.querySelector('.delete')
    const display = note.querySelector('.display')
    const textarea = note.querySelector('textarea')
    textarea.innerText = item;
    display.innerHTML = marked(textarea.innerText)
    editBtn.addEventListener('click', () => {
      if (display.classList.contains('hidden')) {
        display.classList.remove('hidden');
        textarea.classList.add('hidden');
        editBtn.children[0].classList.remove('fa-check-alt');
        editBtn.children[0].classList.add('fa-edit');
        notes.push(textarea.value)
        localStorage.setItem('notes', JSON.stringify(notes))

      } else {
        textarea.classList.remove('hidden');
        display.classList.add('hidden');

        editBtn.children[0].classList.remove('fa-edit');
        editBtn.children[0].classList.add('fa-check');
        notes.indexOf(textarea.value) !== -1 ? notes.splice(notes.indexOf(textarea.value), 1) : null;
      }
    })
    deleteBtn.addEventListener('click', () => {
      notes.splice(notes.indexOf(textarea.value), 1)
      localStorage.setItem('notes', JSON.stringify(notes))
      note.remove();
    })
    textarea.addEventListener('input', (event) => {
      const {value} = event.target;
      display.innerHTML = marked(value);
    })
    noteContainer.appendChild(note)
  })

}
function checkStorage() {
  let dark, notes;
  if (localStorage.getItem('dark') !== null) {
    dark = JSON.parse(localStorage.getItem('dark'))
  } else {
    dark = false;
  }
  if (localStorage.getItem('notes') === null) {
    notes = [];
  } else {
    notes = JSON.parse(localStorage.getItem('notes'))
  }
  return [dark, notes]
}

themeBtn.addEventListener('click', toggleTheme)
addBtn.addEventListener('click', addNote);

const nav = document.querySelector('nav');
window.onscroll = function () {
  "use strict";
  if (document.body.scrollTop >= 50 || document.documentElement.scrollTop >= 50) {
    nav.classList.add("nav-colored");
    nav.classList.remove("nav-transparent");
  }
  else {
    nav.classList.add("nav-transparent");
    nav.classList.remove("nav-colored");
  }
};

const updateThemeStorage = (prev) => {
  prev = !prev;
  localStorage.setItem('dark', JSON.stringify(prev))
}

function toggleTheme() {
  document.body.classList.toggle('dark');
  const [dark] = checkStorage();
  updateThemeStorage(dark);
  console.log(dark)
}

function addNote() {
  const note = document.createElement('div')
  note.classList.add('note')
  note.innerHTML = `
<div class="note-tools">
 <button class="edit"><i class="fas fa-edit"></i></button>
 <button class="delete"><i class="fas fa-trash"></i></button>
</div>
<div class="display">

</div>
<textarea placeholder="Enter your notes here (markdown allowed)" class="hidden"></textarea>
`
  const editBtn = note.querySelector('.edit');
  const deleteBtn = note.querySelector('.delete')
  const display = note.querySelector('.display')
  const textarea = note.querySelector('textarea')
  editBtn.addEventListener('click', () => {
    let idx = -1;
    if (display.classList.contains('hidden')) {
      display.classList.remove('hidden');
      textarea.classList.add('hidden');
      editBtn.children[0].classList.remove('fa-check-alt');
      editBtn.children[0].classList.add('fa-edit');
      notes.push(textarea.value)
      localStorage.setItem('notes', JSON.stringify(notes))

    } else {
      textarea.classList.remove('hidden');
      display.classList.add('hidden');

      editBtn.children[0].classList.remove('fa-edit');
      editBtn.children[0].classList.add('fa-check');
      textarea.focus();
      idx = notes.indexOf(textarea.value)
      idx !== -1 ? notes.splice(idx, 1) : null;
    }
  })
  deleteBtn.addEventListener('click', () => {
    notes.splice(notes.indexOf(textarea.value), 1)
    localStorage.setItem('notes', JSON.stringify(notes))
    note.remove();
  })
  textarea.addEventListener('input', (event) => {
    const {value} = event.target;
    display.innerHTML = marked(value);
  })
  noteContainer.appendChild(note)
}
