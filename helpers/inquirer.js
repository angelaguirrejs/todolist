const inquirer = require('inquirer');
require('colors');

const questions = [
    {
        type: 'list',
        name: 'option',
        message: 'What do you want to do?',
        choices: [
            {
                value: 1,
                name: `${'1.'.green} Create a task`
            }, 
            {
                value: 2,
                name: `${'2.'.green} List tasks`
            },

            {
                value: 3,
                name: `${'3.'.green} List completed tasks`
            },
            {
                value: 4,
                name: `${'4.'.green} List pending tasks`
            },
            {
                value: 5,
                name: `${'5.'.green} Complete a task`
            },
            {
                value: 6,
                name: `${'6.'.green} Delete a task`,
            }, 
            {
                value: 0,
                name: `${'0.'.green} Exit`
            }
        ]
    },
]

async function inquirerMenu() {

    console.clear();
    console.log('=========================='.green);
    console.log('         Todolist ');
    console.log('==========================\n'.green);

    const opt = await inquirer.prompt(questions);

    return opt;
}

async function pause() {

    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `Press ${'ENTER'.green} to continue`

        }
    ]

    console.log('\n');
    await inquirer.prompt(question);
}

async function readInput(message) {
    const question = [
        {
            type: 'input',
            name: 'text',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Type a right value';
                }
                return true;
            }
        }
    ];

    const { text } = await inquirer.prompt(question);
    return text;
}

async function deleteTaskMenu( tasks = [] ) {

    const choices = tasks.map((task, index) => {

        const idx = `${index + 1}`.green;

        return {
            value: task.id,
            name: `${idx}. ${task.description}`,
        }
    });

    choices.unshift({
        value: 0,
        name: 'Exit'.green
    });

    const questions = [
        {
            type: 'list',
            name: 'selectedId',
            choices,
        }
    ]

    const { selectedId } = await inquirer.prompt(questions); 
    return selectedId;
}

async function completeTaskCheckList( tasks = [] ) {

    const choices = tasks.map((task, index) => {

        const idx = `${index + 1}`.green;

        return {
            value: task.id,
            name: `${idx}. ${task.description}`,
            checked: task.completedAt ? true : false
        }
    });

    const questions = [
        {
            type: 'checkbox',
            name: 'selectedIds',
            choices,
        }
    ]

    const { selectedIds } = await inquirer.prompt(questions); 
    return selectedIds;
}

module.exports = {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskMenu,
    completeTaskCheckList
}
