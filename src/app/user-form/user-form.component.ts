import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>Add New User</h2>
      <form [formGroup]="userForm" (ngSubmit)="onSubmit()">
        <div class="form-field">
          <label for="name">Name:</label>
          <input id="name" type="text" formControlName="name">
          <div *ngIf="userForm.get('name')?.errors?.['required'] && userForm.get('name')?.touched">
            Name is required
          </div>
        </div>

        <div class="form-field">
          <label for="email">Email:</label>
          <input id="email" type="email" formControlName="email">
          <div *ngIf="userForm.get('email')?.errors?.['required'] && userForm.get('email')?.touched">
            Email is required
          </div>
          <div *ngIf="userForm.get('email')?.errors?.['email'] && userForm.get('email')?.touched">
            Invalid email format
          </div>
        </div>

        <div class="form-field">
          <label for="age">Age:</label>
          <input id="age" type="number" formControlName="age">
          <div *ngIf="userForm.get('age')?.errors?.['required'] && userForm.get('age')?.touched">
            Age is required
          </div>
        </div>

        <button type="submit" [disabled]="!userForm.valid">Submit</button>
      </form>
    </div>
  `,
  styles: [`
    .form-container {
      max-width: 400px;
      margin: 20px auto;
      padding: 20px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .form-field {
      margin-bottom: 15px;
    }
    label {
      display: block;
      margin-bottom: 5px;
    }
    input {
      width: 100%;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    button {
      background-color: #4CAF50;
      color: white;
      padding: 10px 15px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    button:disabled {
      background-color: #cccccc;
      cursor: not-allowed;
    }
  `]
})
export class UserFormComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (user) => {
          console.log('User added successfully:', user);
          this.userForm.reset();
        },
        error: (error) => {
          console.error('Error adding user:', error);
        }
      });
    }
  }
}
