// An array to store the to-do list items
let toDoList = [];

// Renders the to-do list on the web page
function renderList() {
    // Global variable for the list container
    const listContainer = document.getElementById("toDoList");
    // Clears the existing content to re-render from scratch
    listContainer.innerHTML = "";

    // Iterates through each to-do list item
    toDoList.forEach((item) => {
        // Creates a new list item element using JavaScript
        const listItem = document.createElement("li");

        // Creates a checkbox element for task completion status
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.style.textDecoration = "line-through";
        checkbox.className = "checkbox";
        checkbox.addEventListener("change", () => toggleComplete(item.id));

        // Creates a span element for the task name
        const itemName = document.createElement("span");
        itemName.textContent = item.name;
        itemName.className = item.completed ? "completed" : "";

        // Creates a span element for the task creation date
        const createdDate = document.createElement("span");
        createdDate.textContent = `Created: ${item.createdDate}`;

        // Creates a span element for the delete icon
        const deleteIcon = document.createElement("span");
        deleteIcon.innerHTML = "&times";
        deleteIcon.className = "delete";
        deleteIcon.addEventListener("click", () => deleteItem(item.id));

        // Appends elements to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(itemName);
        listItem.appendChild(createdDate);
        listItem.appendChild(deleteIcon);

        // Appends the list item to the list container
        listContainer.appendChild(listItem);
    });
}

// Adds a new item to the to-do list
function addItem() {
    // Retrieves the task name input element
    const taskNameInput = document.getElementById("taskName");
    const taskName = taskNameInput.value.trim();

    // Validates the task name
    if (isValidTask(taskName)) {
        // Creates a new to-do list item
        const newItem = {
            id: Date.now(),
            name: taskName.charAt(0).toUpperCase() + taskName.slice(1),
            createdDate: new Date().toLocaleDateString(),
            completed: false,
        };

        // Adds a click event listener to the sort button
        let sortBtn = document.getElementById('sortButton');
        sortBtn.addEventListener('click', sortTasks);
        let isSorted = true;

        // Sorts the to-do list based on the task name
        function sortTasks() {
            isSorted = !isSorted;
            if (isSorted) {
                toDoList.sort((a, b) => (a.name > b.name ? 1 : -1));
            } else {
                toDoList.sort((a, b) => (a.name < b.name ? 1 : -1));
            }
            renderList();
        }

        // Adds the new item to the to-do list, saves to local storage, and re-renders the list
        toDoList.push(newItem);
        saveTasksToLocalStorage();
        renderList();
        taskNameInput.value = "";
    } else {
        alert("Please enter a valid task name (more than 3 characters, starting with an uppercase letter).");
    }
}

// Checks if a task name is valid
const isValidTask = (name) => {
    return name !== "" && name.length > 3 && /^[A-Z]/.test(name);
};

// Toggles the completion status of a to-do list item
function toggleComplete(itemId) {
    const item = toDoList.find((item) => item.id === itemId);
    if (item) {
        item.completed = !item.completed;
        saveTasksToLocalStorage();
        renderList();
    }
}

// Deletes a to-do list item
function deleteItem(itemId) {
    toDoList = toDoList.filter((item) => item.id !== itemId);
    saveTasksToLocalStorage();
    renderList();
}

// Saves the to-do list to local storage
function saveTasksToLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(toDoList));
}

// Loads stored tasks from local storage on page load
window.addEventListener("load", () => {
    const storedTasks = localStorage.getItem("tasks");
    toDoList = storedTasks ? JSON.parse(storedTasks) : [];
    renderList();
});