import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './app-routing/app-routing.module';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: User[] = [];

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

  addUser(user: User): Observable<User> {
    const newUser = {
      ...user,
      id: this.users.length + 1
    };
    this.users.push(newUser);
    return of(newUser);
  }

  deleteUser(id: number): Observable<void> {
    const index = this.users.findIndex(user => user.id === id);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
    return of(void 0);
  }

  updateUser(user: User): Observable<User> {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = { ...user };
      return of(this.users[index]);
    }
    throw new Error('User not found');
  }
}
