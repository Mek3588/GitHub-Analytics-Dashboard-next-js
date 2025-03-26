'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { GitHubEvent } from '@/lib/types';
import { fetchUserEvents } from '@/lib/github';
import { Activity, GitCommit, GitPullRequest, Star } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { format } from 'date-fns';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function ActivityPage() {
  const [events, setEvents] = useState<GitHubEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchUsername, setSearchUsername] = useState('Mek3588');
  const [error, setError] = useState('');

  const fetchEvents = async (username: string) => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchUserEvents(username);
      setEvents(data);
    } catch (error) {
      console.error('Error fetching events:', error);
      setError('Failed to fetch activity. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(searchUsername);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchEvents(searchUsername);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'PushEvent':
        return <GitCommit className="h-4 w-4" />;
      case 'PullRequestEvent':
        return <GitPullRequest className="h-4 w-4" />;
      case 'WatchEvent':
        return <Star className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const getEventDescription = (event: GitHubEvent) => {
    switch (event.type) {
      case 'PushEvent':
        return `pushed to ${event.repo.name}`;
      case 'PullRequestEvent':
        return `${event.payload.action} a pull request in ${event.repo.name}`;
      case 'WatchEvent':
        return `starred ${event.repo.name}`;
      default:
        return `performed ${event.type} on ${event.repo.name}`;
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-[80px] w-full" />
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
        {events.map((event) => (
          <Card key={event.id}>
            <CardContent className="flex items-center gap-4 p-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={event.actor.avatar_url} alt={event.actor.login} />
                <AvatarFallback>{event.actor.login[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  {getEventIcon(event.type)}
                  <span className="font-medium">{event.actor.login}</span>
                  <span className="text-muted-foreground">{getEventDescription(event)}</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  {format(new Date(event.created_at), 'MMM d, yyyy HH:mm')}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}