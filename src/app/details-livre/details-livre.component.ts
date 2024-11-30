import { Component } from '@angular/core';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-liste',
  templateUrl: './details-livre.component.html',
  styleUrls: ['./details-livre.component.css'],
})
export class DetailsLivreComponent {
  tasks: { titre: string; description: string }[] = [];

  constructor(private taskService: TaskService) {}
  ngOnInit(): void {
    this.tasks = this.taskService.getTasks();
  }

  supprimerTache(index: number) {
    this.taskService.deleteTask(index);
  }
}
