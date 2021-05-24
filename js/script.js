{
    let tasks = [];
    let toggleItemVisibility = "";

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

    const toggleDoneItemsVisibility = () => {
        toggleItemVisibility = (toggleItemVisibility === "") ? "list__item--hidden" : "";
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
        hideAllDoneButton.addEventListener("click", toggleDoneItemsVisibility);
    };

    const renderTasks = () => {
        let htmlTasksString = "";
        for (const task of tasks) {
            const itemVisibility = (task.done) ? toggleItemVisibility : "";
            htmlTasksString += `
                <li class="list__item ${itemVisibility}">
                  <button class="list__button list__button--done js-done">
                    ${task.done ? "✔" : " "}
                  </button>
                  <span class="list__itemContent
                    ${task.done ? " list__itemContent--done" : ""}"
                  >
                    ${task.content}
                  </span>
                  <button class="list__button list__button--remove js-remove">🗑</button>
                </li>
                `;
        };
        document.querySelector(".js-tasks").innerHTML = htmlTasksString;
    };

    const renderButtons = () => {
        let htmlButtonsString = "";
        htmlButtonsString +=
            `<button class="section__headerButton ${tasks.length === 0 ? "section__headerButton--hidden" : ""} js-hideAllDone">
                ${toggleItemVisibility === "list__item--hidden" ? "Pokaż ukończone" : "Ukryj ukończone"}
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
