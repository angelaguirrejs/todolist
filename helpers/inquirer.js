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

module.exports = {
    inquirerMenu,
    pause,
}