import { Component } from '@angular/core';
import { TasksService } from './tasks.service';
import { Task } from 'src/app/models/task';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  tasks : Task[] = [];
  resultTask : Task[] = [];

  myTasks : Task = {
    label : "",
    complated : false      
  }

  isEditForm = false;
  showForm = false;
  searchText = ""

  constructor(private tasksServices: TasksService){}

  ngOnInit(): void {
    this.getAllTasks();
  }

  //Vider Les Champs:
  viderChapms(){
    this.myTasks ={
      label:"",
      complated:false
    }
  }

// Get All Tasks:
  getAllTasks(){
    return this.tasksServices.allTasksService()
  .subscribe((tasks )=> {
    this.resultTask =  this.tasks = tasks
  })
  }

  // Delete Tasks:
  deleteTask(id:any){
    return this.tasksServices.deleteTaskService(id).subscribe(()=>{
      this.tasks = this.tasks.filter(task => task.id != id);
    })
  }

  //Add Task:
  addTask(){
    return this.tasksServices.addTaskService(this.myTasks)
    .subscribe((task)=>{
      this.tasks = [task ,...this.tasks];
      this.viderChapms();
      this.showForm = false;
    });
  }

  //Is Cpmplated :
  isComplated(task:any){
    return this.tasksServices.isComplatedService(task.id,task.complated).subscribe(()=>{
      task.complated = !task.complated
    })
  }

  //Edit Task:
  editTask(task:any){
    this.myTasks = task;
    this.isEditForm = true
  }


  updateTask(){
    return this.tasksServices.udapteTaskservice(this.myTasks)
    .subscribe(task=>{
      this.viderChapms();
      this.isEditForm = false;
    });
  }


  // Search Task
  searchTask(){
    this.resultTask = this.tasks.filter((task) => task.label.toLowerCase().includes(this.searchText.toLowerCase()))

}

  

}
