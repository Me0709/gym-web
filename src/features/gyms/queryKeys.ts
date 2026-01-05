export const gymKeys = {
  all: ['gyms'] as const,
  lists: () => [...gymKeys.all, 'list'] as const,
  list: (filters: string) => [...gymKeys.lists(), { filters }] as const,
  details: () => [...gymKeys.all, 'detail'] as const,
  detail: (id: string) => [...gymKeys.details(), id] as const,
};
