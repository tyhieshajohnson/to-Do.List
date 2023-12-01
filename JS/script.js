// An array to store the to-do list items
let myToDoList = [];

// Renders the to-do list on the web page
function renderList() {
    // Global variable for the list container
    const listContainer = document.getElementById("myToDoList");
    // Clears the existing content to re-render from scratch
    listContainer.innerHTML = "";

    // Iterates through each to-do list item
    myToDoList.forEach((item) => {
        // Creates a new list item element using JavaScript
        const listItem = document.createElement("li");

        // Creates a checkbox element for task completion status
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = item.completed;
        checkbox.style.textDecoration = "line-through";
        checkbox.className = "checkbox";
        checkbox.addEventListener("change", () => myToggleComplete(item.id));

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
        deleteIcon.addEventListener("click", () => myDeleteItem(item.id));

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
function myAddItem() {
    // Retrieves the task name input element
    const taskNameInput = document.getElementById("myTaskName");
    const taskName = taskNameInput.value.trim();

    // Validates the task name
    if (myIsValidTask(taskName)) {
        // Creates a new to-do list item
        const newItem = {
            id: Date.now(),
            // This line adds a property to the newItem object with the key name. 
            // charAt targets the character of the index.
            // slice = targets the index extracts a portion from a list
            name: taskName.charAt(0).toUpperCase() + taskName.slice(1),
            createdDate: new Date().toLocaleDateString(),
            completed: false,
        };

        // Adds a click event listener to the sort button
        let sortBtn = document.getElementById('mySortButton');
        sortBtn.addEventListener('click', mySortTasks);
        let isSorted = false;

        function mySortTasks() {
            isSorted = !isSorted;
            if (isSorted) {
                myToDoList.sort((a, b) => (a.name > b.name ? 1 : -1)); // Sort alphabetically
            } else {
                myToDoList.sort((a, b) => (a.name < b.name ? 1 : -1)); //  reverse alphabetical order
            }
            // NOT FUNCTIONING :(
        }

        // Adds the new item to the to-do list, saves to local storage, and re-renders the list
        myToDoList.push(newItem);
        mySaveTasksToLocalStorage();
        renderList();
        taskNameInput.value = "";
    } else {
        alert("Start Task with Uppercase!");
    }
}

const addItemButton = document.getElementById("myAddItemButton");

// Add an event listener for the "click" event
addItemButton.addEventListener("click", myAddItem);

// Checks if a task name is valid
const myIsValidTask = (name) => {
    return name !== "" && name.length > 3 && /^[A-Z]/.test(name);
};

// Toggles the completion status of a to-do list item
function myToggleComplete(itemId) {
    const item = myToDoList.find((item) => item.id === itemId);
    if (item) {
        item.completed = !item.completed;
        mySaveTasksToLocalStorage();
        renderList();
    }
}

// Deletes a to-do list item
function myDeleteItem(itemId) {
    myToDoList = myToDoList.filter((item) => item.id !== itemId);
    mySaveTasksToLocalStorage();
    renderList();
}

// Saves the to-do list to local storage
function mySaveTasksToLocalStorage() {
    localStorage.setItem("myTasks", JSON.stringify(myToDoList));
}

// Loads stored tasks from local storage on page load
window.addEventListener("load", () => {
    const storedTasks = localStorage.getItem("myTasks");
    myToDoList = storedTasks ? JSON.parse(storedTasks) : [];
    renderList();
});