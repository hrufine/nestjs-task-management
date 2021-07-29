import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import {  TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { Task } from './task.enitity';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){
    }
    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto):Promise<Task[]>{
        return this.tasksService.getTasks(filterDto); 
    }
    @Get('/:id')
    async getTaskById(@Param('id') id:string):Promise<Task>{
      return this.tasksService.getTaskById(id);
    }
    @Post()
    async createTask(@Body()
    createTaskDto:CreateTaskDto):Promise<Task>{
      return this.tasksService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id:string):Promise<void>{
      return this.tasksService.deleteTask(id);
    }
    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id') id:string,
      @Body() updateTaskStatusDto:UpdateTaskStatusDto
    ):Promise<Task>{
      const { status } = updateTaskStatusDto;
      return this.tasksService.updateTaskStatus(id,status);
    }

}
