import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { getUser, clearAuth, User } from '@/lib/auth';

export function useAuthGuard() {
    const router = useRouter();
    const pathname = usePathname();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [authenticated, setAuthenticated] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;

        const checkAuth = () => {
            try {
                const currentUser = getUser();
                const hasToken = typeof window !== 'undefined' && localStorage.getItem('sevastu_access_token');

                if (!currentUser || !hasToken) {
                    setAuthenticated(false);
                    setUser(null);
                    if (pathname !== '/login') {
                        clearAuth();
                        // Add slight delay before redirect to allow fallback UI to show
                        setTimeout(() => router.replace('/login'), 2000);
                    }
                } else {
                    setAuthenticated(true);
                    setUser(currentUser);
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setAuthenticated(false);
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, [pathname, router, mounted]);

    const logout = () => {
        clearAuth();
        router.push('/login');
    };

    return { user, loading: loading || !mounted, authenticated, logout };
}
