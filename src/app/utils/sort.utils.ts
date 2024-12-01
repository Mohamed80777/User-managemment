import { User } from '../app-routing/app-routing.module';

type SortDirection = 'asc' | 'desc';

interface SortConfig {
  column: keyof User;
  direction: SortDirection;
}

/**
 * Sort users by a single column
 * @param users Array of users to sort
 * @param column Column to sort by
 * @param direction Sort direction ('asc' or 'desc')
 * @returns Sorted array of users
 */
export function sortUsers(
  users: User[],
  column: keyof User,
  direction: SortDirection
): User[] {
  return [...users].sort((a, b) => {
    const aValue = a[column];
    const bValue = b[column];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (aValue === undefined || aValue === null) return 1;
    if (bValue === undefined || bValue === null) return -1;

    return direction === 'asc'
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });
}

/**
 * Sort users by multiple columns
 * @param users Array of users to sort
 * @param sortConfigs Array of sort configurations in priority order
 * @returns Sorted array of users
 */
export function multiColumnSort(
  users: User[],
  sortConfigs: SortConfig[]
): User[] {
  return [...users].sort((a, b) => {
    for (const { column, direction } of sortConfigs) {
      const aValue = a[column];
      const bValue = b[column];

      if (aValue === bValue) continue;

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return direction === 'asc'
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }

      if (aValue === undefined || aValue === null) return 1;
      if (bValue === undefined || bValue === null) return -1;

      return direction === 'asc'
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    }
    return 0;
  });
}

/**
 * Get the next sort direction in the cycle: asc -> desc -> none
 * @param currentDirection Current sort direction
 * @returns Next sort direction
 */
export function getNextSortDirection(
  currentDirection?: SortDirection
): SortDirection | undefined {
  switch (currentDirection) {
    case 'asc': return 'desc';
    case 'desc': return undefined;
    default: return 'asc';
  }
}
