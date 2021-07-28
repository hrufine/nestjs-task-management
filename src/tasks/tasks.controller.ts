import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { title } from 'process';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-task-filter.dto';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService:TasksService){
    }
    @Get()
    getTasks(@Query() filterDto:GetTasksFilterDto):Task[]{
      //if we have any filters then call taskSevice.getTasksWithFilters
      //else call getAllTasks
      if(Object.keys(filterDto).length){
        return this.tasksService.getTasksWithFilters(filterDto);
      }
      else{
        return this.tasksService.getAllTasks();
      }
       
    }
    @Get('/:id')
    getTaskById(@Param('id') id:string):Task{
      return this.tasksService.getTaskById(id);
    }
    @Post()
    createTask(@Body()
    createTaskDto:CreateTaskDto):Task{
      return this.tasksService.createTask(createTaskDto);
    }
    @Delete('/:id')
    deleteTask(@Param('id') id:string):void{
      return this.tasksService.deleteTask(id);
    }
    @Patch('/:id/status')
    updateTaskStatus(
      @Param('id') id:string,
      @Body('status') status:TaskStatus
    ):Task{
      return this.tasksService.updateTaskStatus(id,status);
    }

}
