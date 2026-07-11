import Link from 'next/link';
import { SearchX, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6">
        <SearchX className="w-12 h-12 text-muted-foreground" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
        Page Not Found
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        We couldn't find the page you were looking for. It might have been moved, deleted, or never existed.
      </p>
      <Link href="/dashboard">
        <Button size="lg" className="gap-2">
          <Home className="w-4 h-4" />
          Back to Dashboard
        </Button>
      </Link>
    </div>
  );
}
