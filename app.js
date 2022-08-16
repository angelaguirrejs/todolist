require('colors');

const {
    inquirerMenu,
    pause,
    readInput,
    deleteTaskMenu,
    completeTaskCheckList
} = require('./helpers/inquirer');

const { listTask, listCompletedTasks } = require('./helpers/list-tasks');

const TaskService = require('./services/task.service');

console.clear();

async function main() {

    let option = '';
    const service = new TaskService();

    do {
        const { option } = await inquirerMenu();

        switch (option) {
            case 1:
                const description = await readInput('Type a description: ');
                await service.create(description);
                break;

            case 2:
                const tasks1 = await service.find();
                console.log(listTask(tasks1));
                break;

            case 3:
                const tasks2 = await service.find();
                console.log(listCompletedTasks(tasks2));
                break;

            case 4:
                const tasks3 = await service.find();
                console.log(listCompletedTasks(tasks3, false));
                break;

            case 5:
                const tasks4 = await service.find();
                const selectedIds = await completeTaskCheckList(tasks4);
                await service.toggleCompleted(selectedIds);
                break;

            case 6:
                const tasks5 = await service.find();
                const taskId = await deleteTaskMenu(tasks5);

                if (taskId != 0) {
                    const confirm = await readInput(`Enter ${"y".green} if you are sure or any key to discard`);
                    if (confirm.toLowerCase() == 'y') {
                        await service.delete(taskId);
                    }
                }
                break;

            case 0:
                console.log('Bye');
                break;
        }

        await pause();

    } while (option != 0);
}



main();