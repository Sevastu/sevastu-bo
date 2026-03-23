"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginApi } from "@/features/auth/api/login";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            await loginApi(email, password);
            router.push("/dashboard");
        } catch (err: any) {
            setError(err?.response?.data?.message || err?.message || "Login failed. Please check your credentials.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-neutral-900/5 selection:bg-primary/10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-100 via-transparent to-transparent opacity-50 pointer-events-none" />
            <Card className="w-[400px] shadow-2xl border-white/20 backdrop-blur-xl bg-white/90">
                <CardHeader className="space-y-1 pb-8">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl mb-4 flex items-center justify-center shadow-lg">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <CardTitle className="text-3xl font-extrabold tracking-tight text-neutral-900">Kaamsetu</CardTitle>
                    <CardDescription className="text-neutral-500 font-medium">Log into the administrative dashboard</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="font-semibold text-neutral-700">Email Address</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="admin@kaamsetu.com"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="h-11 transition-all focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" className="font-semibold text-neutral-700">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="h-11 transition-all focus:ring-2 focus:ring-blue-500/20"
                            />
                        </div>
                        {error && (
                            <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-lg flex items-center">
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                                {error}
                            </div>
                        )}
                        <Button className="w-full h-11 text-base font-semibold shadow-md active:scale-[0.98] transition-all bg-blue-600 hover:bg-blue-700" type="submit" disabled={isLoading}>
                            {isLoading ? "Signing In..." : "Sign In"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
