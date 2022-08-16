const fs = require('fs');

const Task = require("../models/task.model");


class TaskService {

    constructor() {

        this.filePath = './db/data.json';
        this.list = {};

        let data = fs.readFileSync(this.filePath, { encoding: 'utf-8' });

        if(data) {
            data = JSON.parse(data);

            data.forEach(task => {
                this.list[task.id] = task;
            });
        }
        
    }

    async find() {

        const list = [];

        Object.keys(this.list).forEach(key => {
            list.push(this.list[key]);
        });

        return list;
    }

    async findOne(id) {
        
        if(!this.list[id]) {
            throw Error('Task not found');
        }

        return this.list[id];
    }

    async create(description) {

        const task = new Task(description);
        this.list[task.id] = task;
        await this.save();
        return task;
    }

    async toggleCompleted(ids){
        
        const tasks = await this.find();

        tasks.forEach(async task => {
            if(ids.includes(task.id)) {
                if(!task.completedAt) {
                    this.list[task.id].completedAt = new Date().toISOString();
                }
            } else {
                this.list[task.id].completedAt = null;
            }
        });

        return true;

    }

    async delete(id) {
        this.findOne(id);
        delete this.list[id];
        await this.save();
        return true;
    }

    async save() {
        const data = await this.find();
        fs.writeFileSync(this.filePath, JSON.stringify(data));
    }

}

module.exports = TaskService;