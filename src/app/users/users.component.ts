import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserFormComponent } from '../user-form/user-form.component';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [CommonModule, UserFormComponent, UserListComponent],
  template: `
    <div class="users-container">
      <h1>User Management</h1>
      <div class="users-content">
        <app-user-form></app-user-form>
        <app-user-list></app-user-list>
      </div>
    </div>
  `,
  styles: [`
    .users-container {
      padding: 2rem;
    }

    h1 {
      text-align: center;
      color: #333;
      margin-bottom: 2rem;
    }

    .users-content {
      max-width: 1200px;
      margin: 0 auto;
    }
  `]
})
export class UsersComponent {}
