import { toast } from 'sonner';

const GITHUB_API_BASE = 'https://api.github.com';

export async function fetchGitHubUser(username: string): Promise<any> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}`);
  if (!response.ok) throw new Error('Failed to fetch user data');
  return response.json();
}

export async function fetchUserRepos(username: string, page = 1, per_page = 10): Promise<any> {
  const response = await fetch(
    `${GITHUB_API_BASE}/users/${username}/repos?page=${page}&per_page=${per_page}&sort=updated`
  );
  if (!response.ok) throw new Error('Failed to fetch repositories');
  return response.json();
}

export async function fetchUserEvents(username: string): Promise<any> {
  const response = await fetch(`${GITHUB_API_BASE}/users/${username}/events/public`);
  if (!response.ok) throw new Error('Failed to fetch user events');
  return response.json();
}

export function calculateLanguageStats(repos: any[]): { [key: string]: number } {
  const stats: { [key: string]: number } = {};
  repos.forEach((repo) => {
    if (repo.language) {
      stats[repo.language] = (stats[repo.language] || 0) + 1;
    }
  });
  return stats;
}