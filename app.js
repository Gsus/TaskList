// Define UI Vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all event listeners
loadEventListeners();

// Load all event listeners
function loadEventListeners() {
	// DOM Load event
	document.addEventListener('DOMContentLoaded', getTasks)
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear tasks event
	clearBtn.addEventListener('click', clearTasks);
	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
}

// Get tasks from LS
function getTasks() {
	let tasks;
	// Check if local storage (LS) is empty
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else { // If there are tasks, grab them and store them as an array in the "tasks" variable
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}

	tasks.forEach(function(task) { // Add said tasks to the Task List (if there's any)
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(task));
		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon html
		link.innerHTML = '<i class = "fa fa-remove"></i>';
		// Append the link to li
		li.appendChild(link);
		// Append li to ul
		taskList.appendChild(li);
	});
}

// Add Task
function addTask(e) {
	// If there's no input
	if (taskInput.value === '') {
		alert('Field is empty. Add a task');
	} else {
		// Create li element
		const li = document.createElement('li');
		// Add class
		li.className = 'collection-item';
		// Create text node and append to li
		li.appendChild(document.createTextNode(taskInput.value));
		// Create new link element
		const link = document.createElement('a');
		// Add class
		link.className = 'delete-item secondary-content';
		// Add icon html
		link.innerHTML = '<i class = "fa fa-remove"></i>';
		// Append the link to li
		li.appendChild(link);
		// Append li to ul
		taskList.appendChild(li);
	
		// Store in LS
		storeTaskInLocalStorage(taskInput.value);
	
		// Clear input
		taskInput.value = '';
	}

	e.preventDefault();
}

// Store task
function storeTaskInLocalStorage(task) {
	let tasks;
	// Check if local storage (LS) is empty
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else { // If there are tasks, grab them and store them as an array in the "tasks" variable
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	// Push added task & update LS
	tasks.push(task);

	localStorage.setItem('tasks', JSON.stringify(tasks));
}

//  Remove task. Pretty self-explanatory, I believe
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();
			// Remove from LS
			removeTaskFromLocalStorage(e.target.parentElement.parentElement);
		}
	}
}

// Remove from LS
function removeTaskFromLocalStorage(taskItem) {
	let tasks;
	// Check local storage
	if (localStorage.getItem('tasks') === null) {
		tasks = [];
	} else {
		tasks = JSON.parse(localStorage.getItem('tasks'));
	}
	// Check which task in LS matches the task item to delete
	tasks.forEach(function(task, index){
		if (taskItem.textContent === task) {
			tasks.splice(index, 1);
		}
	});
	// Update LS
	localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Clear tasks
function clearTasks(e) {
	// If there are no tasks added to the list
	if (taskList.firstElementChild === null) {
		alert('Task List is empty');
	} else { // Otherwise, clear list.
		if (confirm('Are you sure? This will clear every task on the list')) {
			while (taskList.firstChild) { // While there's still a task, remove.
				taskList.removeChild(taskList.firstChild);
			}
			// Clear tasks from LS
			localStorage.clear();
		}
	}
}

// Filter Tasks
function filterTasks(e) {
	// Text being typed as input
	const text = e.target.value.toLowerCase();
	// Loop through each task
	document.querySelectorAll('.collection-item').forEach(function (task) {
		// Text content of current task on the list
		const item = task.firstChild.textContent;
		// If the input exists in the item, then show task
		if (item.toLowerCase().indexOf(text) != -1) {
			task.style.display = 'block';
		} else { // If not, hide it
			task.style.display = 'none';
		}
	});
}