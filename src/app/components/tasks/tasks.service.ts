import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from 'src/app/models/task';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  constructor(private http:HttpClient) { }
// get All Tasks
  allTasksService(){
    return this.http.get<Task[]>('http://localhost:3001/tasks');
  }
// Delete One Tasks:
  deleteTaskService(id:any){
    return this.http.delete<Task[]>(`http://localhost:3001/tasks/${id}`);
  }

  // Add  Task:
  addTaskService(task:any){
    return this.http.post<Task>(`http://localhost:3001/tasks`,task);
  }


  //Is Complated :
  isComplatedService(id:any, complated:false){
    return this.http.patch<Task>(`http://localhost:3001/tasks/${id}`,{complated: !complated})
  }


  //Update Task:
  udapteTaskservice(task:any){
    return this.http.put<Task>(`http://localhost:3001/tasks/${task.id}`,task)
  }
}
