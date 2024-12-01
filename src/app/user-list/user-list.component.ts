import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { User } from '../app-routing/app-routing.module';
import { FormsModule } from '@angular/forms';
import { sortUsers } from '../utils/sort.utils';
import { filterUsers } from '../utils/filter.utils';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="user-list-container">
      <div class="list-header">
        <h2>User List</h2>
        <div class="search-box">
          <input
            type="text"
            [(ngModel)]="searchTerm"
            (input)="onSearch()"
            placeholder="Search users..."
            class="search-input"
          >
        </div>
      </div>

      <div class="table-container">
        <table class="users-table">
          <thead>
            <tr>
              <th (click)="sort('id')" class="sortable">
                ID
                <span *ngIf="sortColumn === 'id'" class="sort-indicator">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th (click)="sort('name')" class="sortable">
                Name
                <span *ngIf="sortColumn === 'name'" class="sort-indicator">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th (click)="sort('email')" class="sortable">
                Email
                <span *ngIf="sortColumn === 'email'" class="sort-indicator">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th (click)="sort('age')" class="sortable">
                Age
                <span *ngIf="sortColumn === 'age'" class="sort-indicator">
                  {{ sortDirection === 'asc' ? '↑' : '↓' }}
                </span>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of displayedUsers" class="user-row">
              <td>{{user.id}}</td>
              <td>{{user.name}}</td>
              <td>{{user.email}}</td>
              <td>{{user.age}}</td>
              <td>
                <button class="action-btn edit" (click)="editUser(user)">Edit</button>
                <button class="action-btn delete" (click)="deleteUser(user)">Delete</button>
              </td>
            </tr>
            <tr *ngIf="displayedUsers.length === 0">
              <td colspan="5" class="no-data">No users found</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="pagination" *ngIf="totalPages > 1">
        <button
          [disabled]="currentPage === 1"
          (click)="changePage(currentPage - 1)"
          class="page-btn"
        >
          Previous
        </button>
        <span class="page-info">Page {{currentPage}} of {{totalPages}}</span>
        <button
          [disabled]="currentPage === totalPages"
          (click)="changePage(currentPage + 1)"
          class="page-btn"
        >
          Next
        </button>
      </div>
    </div>
  `,
  styles: [`
    .user-list-container {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 20px;
      margin: 20px 0;
    }

    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }

    .search-input {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      width: 250px;
      font-size: 14px;
    }

    .table-container {
      overflow-x: auto;
    }

    .users-table {
      width: 100%;
      border-collapse: collapse;
      margin-bottom: 20px;
    }

    .users-table th,
    .users-table td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }

    .users-table th {
      background-color: #f5f5f5;
      font-weight: 600;
    }

    .sortable {
      cursor: pointer;
      user-select: none;
    }

    .sort-indicator {
      margin-left: 5px;
      color: #666;
    }

    .user-row:hover {
      background-color: #f9f9f9;
    }

    .action-btn {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 5px;
      font-size: 12px;
    }

    .edit {
      background-color: #4CAF50;
      color: white;
    }

    .delete {
      background-color: #f44336;
      color: white;
    }

    .no-data {
      text-align: center;
      color: #666;
      padding: 20px;
    }

    .pagination {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 10px;
      margin-top: 20px;
    }

    .page-btn {
      padding: 6px 12px;
      border: 1px solid #ddd;
      background-color: white;
      border-radius: 4px;
      cursor: pointer;
    }

    .page-btn:disabled {
      background-color: #f5f5f5;
      cursor: not-allowed;
    }

    .page-info {
      color: #666;
    }
  `]
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  displayedUsers: User[] = [];
  searchTerm: string = '';
  sortColumn: keyof User = 'id';
  sortDirection: 'asc' | 'desc' = 'asc';
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.updateDisplayedUsers();
      },
      error: (error) => {
        console.error('Error loading users:', error);
      }
    });
  }

  onSearch() {
    this.currentPage = 1;
    this.updateDisplayedUsers();
  }

  updateDisplayedUsers() {
    let filtered = filterUsers(this.users, this.searchTerm);
    filtered = sortUsers(filtered, this.sortColumn, this.sortDirection);

    this.totalPages = Math.ceil(filtered.length / this.pageSize);
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.displayedUsers = filtered.slice(startIndex, startIndex + this.pageSize);
  }

  sort(column: keyof User) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.updateDisplayedUsers();
  }

  changePage(page: number) {
    this.currentPage = page;
    this.updateDisplayedUsers();
  }

  editUser(user: User) {
    // Implement edit functionality
    console.log('Edit user:', user);
  }

  deleteUser(user: User) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.userService.deleteUser(user.id!).subscribe({
        next: () => {
          this.loadUsers();
        },
        error: (error) => {
          console.error('Error deleting user:', error);
        }
      });
    }
  }
}
