import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-ajouter',
  templateUrl: './ajouter-livre.component.html',
  styleUrls: ['./ajouter-livre.component.css'],
})
export class AjouterLivreComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private taskService: TaskService) {
    this.taskForm = this.fb.group({
      titre: ['', Validators.required],
      description: [''],
    });
  }

  ajouterTache() {
    if (this.taskForm.valid) {
      this.taskService.addTask(this.taskForm.value);
      this.taskForm.reset();
    }
  }
}
