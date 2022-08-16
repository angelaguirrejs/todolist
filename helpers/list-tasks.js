require('colors');

function listTask(tasks) {

    let response = '';

    tasks.forEach( (task, index) => {
        response += `\n${ index + 1 } :: ${task.id}\n`.green;
        response += `Description: ${task.description}\n`;

        if(task.completedAt) { 
            response += `Status: ${'Completed'.green}\n`;
            response += `Completed at: ${task.completedAt.green}\n`;
        } else {
            response += `Status: ${'Pending'.red}\n`;
        }
        

    });
    
    return response;

}

function listCompletedTasks(tasks, completed = true) {

    if(completed) {
        const filtered = tasks.filter(task => task.completedAt);
        return listTask(filtered);
    }
    
    const filtered = tasks.filter(task => task.completedAt == null);
    return listTask(filtered);
}

module.exports = {
    listTask,
    listCompletedTasks
}