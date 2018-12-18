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
	// Add task event
	form.addEventListener('submit', addTask);
	// Remove task event
	taskList.addEventListener('click', removeTask);
	// Clear tasks event
	clearBtn.addEventListener('click', clearTasks);
	// Filter tasks event
	filter.addEventListener('keyup', filterTasks);
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
		// Clear input
		taskInput.value = '';
	}
	e.preventDefault();
}

//  Remove task. Pretty self-explanatory, I believe
function removeTask(e) {
	if (e.target.parentElement.classList.contains('delete-item')) {
		if (confirm('Are You Sure?')) {
			e.target.parentElement.parentElement.remove();
		}
	}
}

// Clear tasks
function clearTasks(e) {
	// If there are no tasks added to the list
	if (taskList.firstElementChild === null) {
		alert('Task List is empty');
	} else { // Otherwise, clear list.
		if (confirm('Are you sure? This will clear every task on the list')) {
			while(taskList.firstChild) { // While there's still a task, remove.
				taskList.removeChild(taskList.firstChild);
			}
		}
	}
}

// Filter Tasks
function filterTasks(e) {
	// Text being typed as input
	const text = e.target.value.toLowerCase();
	// Loop through each task
	document.querySelectorAll('.collection-item').forEach( function(task) {
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