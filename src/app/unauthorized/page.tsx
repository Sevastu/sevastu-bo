import Link from 'next/link';
import { ShieldAlert, Home, LogIn } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function UnauthorizedPage() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center text-center px-4">
      <div className="w-24 h-24 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center mb-6">
        <ShieldAlert className="w-12 h-12 text-red-600 dark:text-red-500" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground mb-3">
        Access Denied
      </h1>
      <p className="text-lg text-muted-foreground max-w-md mb-8">
        You do not have the required permissions to view this page. If you believe this is an error, please contact your administrator.
      </p>
      <div className="flex gap-4">
        <Link href="/dashboard">
          <Button variant="outline" size="lg" className="gap-2">
            <Home className="w-4 h-4" />
            Dashboard
          </Button>
        </Link>
        <Link href="/login">
          <Button size="lg" className="gap-2">
            <LogIn className="w-4 h-4" />
            Sign In Again
          </Button>
        </Link>
      </div>
    </div>
  );
}
