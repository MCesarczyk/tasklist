{
    const tasks = [
        {
            content: "działamy",
            done: true,
        },
        {
            content: "jedziemy",
            done: false,
        },
    ];

    const addNewTask = (newTaskContent) => {
        tasks.push({
            content: newTaskContent,
        });

        render();
    };

    const removeTask = (index) => {
        tasks.splice(index, 1);
        render();
    };

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
                <li class="form__listItem">
                  <button class="form__button form__button--done js-done">${task.done ? "🗸" : " "}</button>
                <span class="form__listItemContent${task.done ? " form__listItemContent--done" : ""}">
                ${task.content}
                </span>
                 <button class="form__button form__button--remove js-remove">🗑</button>
                </li>
                `;

            document.querySelector(".js-tasks").innerHTML = htmlString;

            const removeButtons = document.querySelectorAll(".js-remove");

            removeButtons.forEach((removeButton, index) => {
                removeButton.addEventListener("click", () => {
                    removeTask(index);
                });
            });
        }
    };

    const onFormSubmit = (event) => {
        event.preventDefault();

        const newTaskContent = document.querySelector(".js-taskInput").value.trim();

        if (newTaskContent === "") {
            return;
        };

        addNewTask(newTaskContent);
    };

    const init = () => {
        render();

        const form = document.querySelector(".js-form");

        form.addEventListener("submit", onFormSubmit);

    };

    init();
}