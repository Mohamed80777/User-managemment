import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private tasks: { titre: string; description: string }[] = [];

  getTasks() {
    return this.tasks;
  }

  addTask(task: { titre: string; description: string }) {
    this.tasks.push(task);
  }

  deleteTask(index: number) {
    this.tasks.splice(index, 1);
  }
}
