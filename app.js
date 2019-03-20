// TO DO - ANDREA
// can still enter blank values as tasks
// add Are You Sure to clear all tasks

// DEFINE UI VARIABLES
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
  // DOM Load event - right after DOM loads, add the tasks from local storage to UI
  document.addEventListener('DOMContentLoaded', getTasks);

  // Add task event
  form.addEventListener('submit', addTask);
  // Remove task event
  taskList.addEventListener('click', removeTask);
  // Clear all tasks event
  clearBtn.addEventListener('click', clearTasks);
  // Filter tasks event
  filter.addEventListener('keyup', filterTasks);
}

// Get Tasks from Local Storage
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) { // check if anything in storage already
    tasks = []; // if nothing, set to empty array
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    //local storage can only store strings, so we must parse as JSON when it comes out
  }

  tasks.forEach(function (task) {
    // Create li element
    const li = document.createElement('li');

    // Add class
    li.className = 'collection-item'; // following Materialize.css standards for li's
    // Create text node and append to li
    li.appendChild(document.createTextNode(task));
    // Create new link element
    const link = document.createElement('a');
    // Add Class
    link.className = 'delete-item secondary-content'; // Materialize.css 'secondary-content'
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append the li to the ul
    taskList.appendChild(li);
  });

}

// Add Task
function addTask(e) {
  if (taskInput.value === '') { // if nothing's entered, then alert
    alert('Add a task');
  }

  // Create li element
  const li = document.createElement('li');

  // Add class
  li.className = 'collection-item'; // following Materialize.css standards for li's
  // Create text node and append to li
  li.appendChild(document.createTextNode(taskInput.value));
  // Create new link element
  const link = document.createElement('a');
  // Add Class
  link.className = 'delete-item secondary-content'; // Materialize.css 'secondary-content'
  // Add icon html
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // Append the link to li
  li.appendChild(link);

  // Append the li to the ul
  taskList.appendChild(li);

  // Store in LS
  storeTaskInLocalStorage(taskInput.value);

  // Clear input
  taskInput.value = '';

  e.preventDefault();
}

// Store Task in Local Storage
function storeTaskInLocalStorage(task){
  let tasks;
  if (localStorage.getItem('tasks') === null){ // check if anything in storage already
    tasks = []; // if nothing, set to empty array
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); 
    //local storage can only store strings, so we must parse as JSON when it comes out
  }

  tasks.push(task); // add to the array
  localStorage.setItem('tasks', JSON.stringify(tasks)); // save to local storage
}

// Remove Task
function removeTask(e) {
  // we want to target the 'x' symbol LINK specifically, not the <li> or the <i> tags
  if (e.target.parentElement.classList.contains('delete-item')){
    if (confirm('Are you sure?')){ // alert window asking user to confirm, if so then remove
      // remove from DOM
      e.target.parentElement.parentElement.remove(); 

      //Remove from Local Storage
      removeTaskFromLocalStorage(e.target.parentElement.parentElement);
    }
  }
}

// Remove Task from Local Storage
function removeTaskFromLocalStorage(taskItem){
  if (localStorage.getItem('tasks') === null){ // check if anything in storage already
    tasks = []; // if nothing, set to empty array
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks')); 
    //local storage can only store strings, so we must parse as JSON when it comes out
  }

  tasks.forEach(function(task, index){
    if (taskItem.textContent === task){ // see if this matches the current task in iteration
      tasks.splice(index, 1); // delete from array
    }
  });

  localStorage.setItem('tasks', JSON.stringify(tasks));

}

// Clear All Tasks
function clearTasks() {
  // taskList.innerHTML = ''; // works 

  // faster (not by much but recommended)
  // Loop through 
  while (taskList.firstChild) { //get first child of task list - so while there's still something in the list
    taskList.removeChild(taskList.firstChild); // remove the first child if there is one  
  }

  // Clear from Local Storage
  clearTasksFromLocalStorage();
}

// Clear Tasks from local storage
function clearTasksFromLocalStorage(){
  localStorage.clear();
}

// Filter Tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(
    function(task){
      const item = task.firstChild.textContent;
      if (item.toLowerCase().indexOf(text) != -1){ // pass in the text
        task.style.display = 'block';
      } else { // no text match
        task.style.display = 'none';
      }
    }
  ); //return a NodeList with all elements with this class
}
