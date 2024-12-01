import { User } from '../app-routing/app-routing.module';

/**
 * Filter users based on a search term
 * @param users Array of users to filter
 * @param searchTerm Term to search for in user properties
 * @param fields Optional array of fields to search in (defaults to name and email)
 * @returns Filtered array of users
 */
export function filterUsers(
  users: User[],
  searchTerm: string,
  fields: (keyof User)[] = ['name', 'email']
): User[] {
  if (!searchTerm) {
    return users;
  }

  const search = searchTerm.toLowerCase().trim();

  return users.filter(user =>
    fields.some(field => {
      const value = user[field];
      return value &&
        String(value)
          .toLowerCase()
          .includes(search);
    })
  );
}

/**
 * Filter users by age range
 * @param users Array of users to filter
 * @param minAge Minimum age (inclusive)
 * @param maxAge Maximum age (inclusive)
 * @returns Filtered array of users
 */
export function filterUsersByAge(
  users: User[],
  minAge?: number,
  maxAge?: number
): User[] {
  return users.filter(user => {
    if (minAge !== undefined && user.age < minAge) {
      return false;
    }
    if (maxAge !== undefined && user.age > maxAge) {
      return false;
    }
    return true;
  });
}

/**
 * Combine multiple filters
 * @param users Array of users to filter
 * @param filters Array of filter functions to apply
 * @returns Filtered array of users
 */
export function applyFilters(
  users: User[],
  filters: ((users: User[]) => User[])[]
): User[] {
  return filters.reduce((filteredUsers, filter) => filter(filteredUsers), users);
}
