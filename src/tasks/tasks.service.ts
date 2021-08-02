import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { title } from 'process';
import { NotFoundError } from 'rxjs';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.enitity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository:TaskRepository,){

    }
    // getAllTasks(){
    //     return this.tasks;
    // }
    async getTaskById(id:string,user:User):Promise<Task>{
       const found = await this.taskRepository.findOne({where:{id,user}});
       if(!found){
        throw new NotFoundException(`Task with ID "${id}" not found.`)
       }
       return found;
    }
    async createTask(createTaskDto:CreateTaskDto,user:User):Promise<Task>{
        return this.taskRepository.createTask(createTaskDto,user);
    }
    async deleteTask(id: string,user:User):Promise<void> {
        const result = await this.taskRepository.delete({id,user});
        if(result.affected == 0){
            throw new NotFoundException();
        }
    }
    async updateTaskStatus(id:string,status:TaskStatus,user:User){
        const task = await this.getTaskById(id,user);
        task.status = status;
        await this.taskRepository.save(task);
        return task;
    }
    getTasks(filterDto: GetTasksFilterDto,user:User): Promise<Task[]> {
      return this.taskRepository.getTasks(filterDto,user);
    }
     
}
