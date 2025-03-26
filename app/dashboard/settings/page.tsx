'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Button } from '@/components/ui/button';
import { useTheme } from 'next-themes';
import { useAuthStore } from '@/lib/store';
import { Trash2 } from 'lucide-react';

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const { user, setLayoutPreference, logout } = useAuthStore();
  
  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all data? This will log you out.')) {
      localStorage.clear();
      logout();
      window.location.href = '/login';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Theme</CardTitle>
          <CardDescription>Choose your preferred theme</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={theme}
            onValueChange={setTheme}
            className="grid grid-cols-3 gap-4"
          >
            <div>
              <RadioGroupItem value="light" id="light" className="peer sr-only" />
              <Label
                htmlFor="light"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Light
              </Label>
            </div>
            <div>
              <RadioGroupItem value="dark" id="dark" className="peer sr-only" />
              <Label
                htmlFor="dark"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Dark
              </Label>
            </div>
            <div>
              <RadioGroupItem value="system" id="system" className="peer sr-only" />
              <Label
                htmlFor="system"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                System
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Layout Preference</CardTitle>
          <CardDescription>Choose how content is displayed</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup
            value={user.layoutPreference}
            onValueChange={setLayoutPreference}
            className="grid grid-cols-2 gap-4"
          >
            <div>
              <RadioGroupItem value="comfortable" id="comfortable" className="peer sr-only" />
              <Label
                htmlFor="comfortable"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Comfortable
              </Label>
            </div>
            <div>
              <RadioGroupItem value="compact" id="compact" className="peer sr-only" />
              <Label
                htmlFor="compact"
                className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-card p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary"
              >
                Compact
              </Label>
            </div>
          </RadioGroup>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Data Management</CardTitle>
          <CardDescription>Clear all cached data and reset user preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Button
            variant="destructive"
            onClick={clearData}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Clear All Data
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}