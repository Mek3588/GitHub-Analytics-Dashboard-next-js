'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GitHubRepo } from '@/lib/types';
import { fetchUserRepos } from '@/lib/github';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import Link from 'next/link';
import { toast } from 'sonner';

export default function RepositoriesPage() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchUsername, setSearchUsername] = useState('Mek3588');
  const [error, setError] = useState('');

  const fetchRepos = async (username: string, pageNum: number) => {
    setLoading(true);
    setError('');
    try {
      const newRepos = await fetchUserRepos(username, pageNum, 10);
      if (pageNum === 1) {
        setRepos(newRepos);
        toast.success('Repositories loaded successfully');
      } else {
        setRepos((prev) => [...prev, ...newRepos]);
        toast.success('More repositories loaded');
      }
      setHasMore(newRepos.length === 10);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      setError('Failed to fetch repositories. Please try again.');
      toast.error('Failed to load repositories');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRepos(searchUsername, 1);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchRepos(searchUsername, 1);
  };

  const loadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchRepos(searchUsername, nextPage);
  };

  if (loading && page === 1) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-[100px] w-full" />
        ))}
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
        <Button type="submit">Search</Button>
      </form>

      {error && (
        <Card>
          <CardContent className="p-4 text-destructive">
            {error}
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {repos.map((repo) => (
          <Card key={repo.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">
                  <Link
                    href={repo.html_url}
                    target="_blank"
                    className="flex items-center gap-2 hover:text-primary"
                  >
                    {repo.name}
                    <ExternalLink className="h-4 w-4" />
                  </Link>
                </CardTitle>
                <span className="text-sm text-muted-foreground">
                  Updated {format(new Date(repo.updated_at), 'MMM d, yyyy')}
                </span>
              </div>
            </CardHeader>
            <CardContent>
              <p className="mb-4 text-muted-foreground">
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

      {hasMore && !loading && (
        <div className="flex justify-center">
          <Button onClick={loadMore} variant="outline">
            Load More
          </Button>
        </div>
      )}

      {loading && page > 1 && (
        <div className="space-y-4">
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className="h-[100px] w-full" />
          ))}
        </div>
      )}
    </div>
  );
}