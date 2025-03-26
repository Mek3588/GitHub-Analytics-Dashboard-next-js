'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GitHubUser, GitHubRepo } from '@/lib/types';
import { fetchGitHubUser, fetchUserRepos, calculateLanguageStats } from '@/lib/github';
import { Users, Star, Search } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuthStore } from '@/lib/store';
import { toast } from 'sonner';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const CHART_COLORS = [
  'hsl(var(--chart-1))',
  'hsl(var(--chart-2))',
  'hsl(var(--chart-3))',
  'hsl(var(--chart-4))',
  'hsl(var(--chart-5))',
];

export default function DashboardPage() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [topRepos, setTopRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchUsername, setSearchUsername] = useState('Mek3588');
  const [error, setError] = useState('');
  const [languageStats, setLanguageStats] = useState<{ name: string; value: number }[]>([]);
  const layoutPreference = useAuthStore((state) => state.user.layoutPreference);

  const fetchGitHubData = async (username: string) => {
    setLoading(true);
    setError('');
    try {
      const userData = await fetchGitHubUser(username);
      setUser(userData);

      const repos = await fetchUserRepos(username, 1, 100);
      const sortedRepos = repos
        .sort((a: GitHubRepo, b: GitHubRepo) => b.stargazers_count - a.stargazers_count)
        .slice(0, 3);
      setTopRepos(sortedRepos);

      // Calculate language statistics
      const stats = calculateLanguageStats(repos);
      const chartData = Object.entries(stats)
        .map(([name, value]) => ({ name, value }))
        .sort((a, b) => b.value - a.value)
        .slice(0, 5);
      setLanguageStats(chartData);

      toast.success('GitHub data loaded successfully');
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to fetch GitHub data. Please check the username and try again.');
      toast.error('Failed to load GitHub data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGitHubData(searchUsername);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchUsername.trim()) {
      fetchGitHubData(searchUsername);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-[125px] w-full" />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Skeleton className="h-[300px]" />
          <Skeleton className="h-[300px]" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
          <Skeleton className="h-[200px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <form onSubmit={handleSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter GitHub username"
          value={searchUsername}
          onChange={(e) => setSearchUsername(e.target.value)}
        />
        <Button type="submit">
          <Search className="h-4 w-4 mr-2" />
          Search
        </Button>
      </form>

      {error && (
        <Card>
          <CardContent className="p-4 text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      {user && (
        <>
          <Card>
            <CardContent className="flex items-center gap-6 pt-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src={user.avatar_url} alt={user.login} />
                <AvatarFallback>{user.login[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.bio}</p>
                <div className="mt-4 flex gap-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{user.followers} followers</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>{user.following} following</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 mb-6">
            <Card>
              <CardHeader>
                <CardTitle>Language Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={languageStats}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        label={(entry) => entry.name}
                      >
                        {languageStats.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={CHART_COLORS[index % CHART_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Repository Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium">Total Repositories</p>
                    <p className="text-2xl font-bold">{user.public_repos}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Most Used Language</p>
                    <p className="text-2xl font-bold">
                      {languageStats[0]?.name || 'N/A'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className={`grid gap-4 ${layoutPreference === 'compact' ? 'grid-cols-1 md:grid-cols-4' : 'grid-cols-1 md:grid-cols-3'}`}>
            {topRepos.map((repo) => (
              <Card key={repo.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{repo.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`mb-4 text-sm text-muted-foreground ${layoutPreference === 'compact' ? 'line-clamp-2' : ''}`}>
                    {repo.description || 'No description available'}
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4" />
                      <span>{repo.stargazers_count}</span>
                    </div>
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <span className="h-3 w-3 rounded-full bg-primary" />
                        <span>{repo.language}</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
}