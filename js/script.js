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

    const render = () => {
        let htmlString = "";

        for (const task of tasks) {
            htmlString += `
            <li 
            ${task.done ? "class=\"form__listItem--done\"" : ""}
            >
            ${task.content}
            </li>
            `;

            document.querySelector(".js-tasks").innerHTML = htmlString;
        }
    };

    const init = () => {
        render();

const form = document.querySelector(".js-form");

form.addEventListener("submit", (event) => {
    event.preventDefault();
})

    };

    init();
}