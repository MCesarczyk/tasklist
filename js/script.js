{
    let tasks = [];

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

    const changeTaskStatus = (index, taskStatus) => {
        tasks = [
            ...tasks.slice(0, index),
            { ...tasks[index], done: taskStatus },
            ...tasks.slice(index + 1),
        ]
        render();
    };

    const toggleTaskDone = (index) => {
        let taskStatus = tasks[index].done;
        taskStatus = (taskStatus === true) ? false : true;
        changeTaskStatus(index, taskStatus);
    };

    const hideAllDoneTasks = () => {
        // tasks = tasks.map
    };

    // new
    const markAllTasksDone = () => {
        while (tasks.some(({ done }) => done === false)) {
            taskStates = tasks.map(({ done }) => done === true);
            const firstUndoneIndex = taskStates.indexOf(false)
            let taskStatus = tasks[firstUndoneIndex].done;
            taskStatus = true;
            tasks = [
                ...tasks.slice(0, firstUndoneIndex),
                { ...tasks[firstUndoneIndex], done: taskStatus },
                ...tasks.slice(firstUndoneIndex + 1),
            ];
        };
        render();
    };
    // new

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

    const renderTasks = () => {
        let htmlString = "";
        for (const task of tasks) {// dodać klasę tasks__item--hidden // ${hideDoneTasks ? "list__item--hidden" : ""}
            htmlString += `
                <li class="list__item">
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
        document.querySelector(".js-tasks").innerHTML = htmlString;
    };

    const renderButtons = () => {
        // robimy htmla z buttonami do wyrenderownaia
    };

    // const bindButtonsEvents = () => {
    //     //przypiąć button z if'em
    //     const hideAllDoneButton = document.querySelector(".js-hideAllDone");
    //     const markAllDoneButton = document.querySelector(".js-markAllDone");
    //     hideAllDoneButton.addEventListener("click", hideAllDoneTasks);
    //     markAllDoneButton.addEventListener("click", () => {
    //         console.log(tasks);
    //     });
    // };

    const render = () => {
        renderTasks();
        renderButtons();
        bindRemoveEvents();
        bindToggleDoneEvents();
        // bindButtonsEvents();
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

        const markAllDoneButton = document.querySelector(".js-markAllDone");
        markAllDoneButton.addEventListener("click", markAllTasksDone);
    };

    init();
}
