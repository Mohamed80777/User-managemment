import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <div class="nav-brand">
        <a routerLink="/" class="brand-link">User Management System</a>
      </div>
      <ul class="nav-links">
        <li><a routerLink="/users" routerLinkActive="active">Users</a></li>
      </ul>
    </nav>
  `,
  styles: [`
    .navbar {
      background-color: #ffffff;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .nav-brand {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .brand-link {
      color: #333;
      text-decoration: none;
    }

    .nav-links {
      list-style: none;
      display: flex;
      gap: 2rem;
      margin: 0;
      padding: 0;
    }

    .nav-links a {
      color: #666;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      transition: all 0.3s ease;
    }

    .nav-links a:hover {
      color: #333;
      background-color: #f0f0f0;
    }

    .nav-links a.active {
      color: #fff;
      background-color: #4CAF50;
    }
  `]
})
export class NavComponent {}
