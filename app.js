require('colors');

const { inquirerMenu , pause} = require('./helpers/inquirer');

console.clear();

async function main() {
    
    let option = '';

    do {
        const { option } = await inquirerMenu();
        await pause();

    }while(option !== 0);
}

main();