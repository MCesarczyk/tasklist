{
    let tasks = [];
    let hideDoneTasks = false;

    const resetInput = (taskInput) => {
        taskInput.value = "";
        taskInput.focus();
    };

    const addNewTask = (newTaskContent) => {
        tasks = [
            ...tasks,
            { content: newTaskContent, done: false }
        ];
        render();
    };

    const removeTask = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            ...tasks.slice(index + 1),
        ]
        render();
    };

    const toggleTaskDone = (index) => {
        tasks = [
            ...tasks.slice(0, index),
            {
                ...tasks[index],
                done: !tasks[index].done,
            },
            ...tasks.slice(index + 1),
        ]
        render();
    };

    const toggleHideDoneTasks = () => {
        hideDoneTasks = !hideDoneTasks;
        render();
    };

    const markAllTasksDone = () => {
        tasks = tasks.map((task) => ({
            ...task,
            done: true,
        }));
        render();
    };

    const bindRemoveEvents = () => {
        const removeButtons = document.querySelectorAll(".js-remove");
        removeButtons.forEach((removeButton, index) => {
            removeButton.addEventListener("click", () => {
                removeTask(index);
            });
        });
    };

    const bindToggleDoneEvents = () => {
        const toggleDoneButtons = document.querySelectorAll(".js-done");
        toggleDoneButtons.forEach((toggleDoneButton, index) => {
            toggleDoneButton.addEventListener("click", () => {
                toggleTaskDone(index);
            });
        });
    };

    const bindButtonsEvents = () => {
        const markAllDoneButton = document.querySelector(".js-markAllDone");
        markAllDoneButton.addEventListener("click", markAllTasksDone);
        const hideAllDoneButton = document.querySelector(".js-hideAllDone");
        hideAllDoneButton.addEventListener("click", toggleHideDoneTasks);
    };

    const renderTasks = () => {
        const htmlTasksString = task => `
                <li class="tasks__item${task.done && hideDoneTasks ? " tasks__item--hidden" : ""}">
                  <button class="tasks__button tasks__button--done js-done">
                    ${task.done ? "✔" : " "}
                  </button>
                  <span class="tasks__itemContent
                    ${task.done ? " tasks__itemContent--done" : ""}"
                  >
                    ${task.content}
                  </span>
                  <button class="tasks__button tasks__button--remove js-remove">🗑</button>
                </li>
                `;
        const tasksOutput = document.querySelector(".js-tasks");
        tasksOutput.innerHTML = tasks.map(htmlTasksString).join(" ");
    };

    const renderButtons = () => {
        let htmlButtonsString = "";
        htmlButtonsString +=
            `<button class="section__headerButton ${tasks.length === 0 ? "section__headerButton--hidden" : ""} js-hideAllDone">
                ${hideDoneTasks === "tasks__item--hidden" ? "Pokaż ukończone" : "Ukryj ukończone"}
            </button>
            <button class="section__headerButton  ${tasks.length === 0 ? "section__headerButton--hidden" : ""} js-markAllDone">
                Ukończ wszystkie
            </button>
        `;
        document.querySelector(".js-buttons").innerHTML = htmlButtonsString;
    };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        bindButtonsEvents();
        isEveryTaskDone = tasks.every(({ done }) => done);
        const markAllDoneButton = document.querySelector(".js-markAllDone");
        markAllDoneButton.disabled = (isEveryTaskDone) ? true : false;
    };

    const onFormSubmit = (event) => {
        event.preventDefault();
        const newTaskContent = document.querySelector(".js-taskInput").value.trim();
        const taskInput = document.querySelector(".js-taskInput");
        if (newTaskContent === "") {
            return;
        }
        addNewTask(newTaskContent);
        resetInput(taskInput);
    };

    const init = () => {
        render();
        const form = document.querySelector(".js-form");
        form.addEventListener("submit", onFormSubmit);
    };
    init();
}
