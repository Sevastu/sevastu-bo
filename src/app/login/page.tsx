"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { loginApi } from "@/features/auth/api/login";
import { LoginNavbar } from "@/components/auth/LoginNavbar";
import { LoginFooter } from "@/components/auth/LoginFooter";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [rememberPassword, setRememberPassword] = useState(false);

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
        <div className="min-h-screen flex flex-col bg-theme transition-theme">
            {/* Navbar */}
            <LoginNavbar />

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-6xl bg-theme-card rounded-2xl shadow-theme-lg overflow-hidden transition-theme">
                    <div className="grid md:grid-cols-2">
                        {/* Left Section - Login Form */}
                        <div className="p-8 lg:p-12">
                            <div className="max-w-sm mx-auto">
                                <CardHeader className="space-y-1 p-0 mb-8">
                
                                    <CardTitle className="text-2xl font-bold text-theme">
                                        Login Into Administrative Dashboard
                                    </CardTitle>
                                    <CardDescription className="text-theme-secondary">
                                        Enter your credentials to access the admin dashboard
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-0">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-semibold text-theme-secondary">
                                                EMAIL ADDRESS
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="admin@sevastu.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-12 border border-theme rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-theme transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-sm font-semibold text-theme-secondary">
                                                PASSWORD
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="h-12 border border-theme rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-theme transition-all"
                                            />
                                        </div>

                                        {error && (
                                            <div className="p-3 text-sm font-medium text-red-600 bg-red-50 dark:bg-red-900/20 rounded-lg flex items-center">
                                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                                </svg>
                                                {error}
                                            </div>
                                        )}

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center">
                                                <input
                                                    id="remember"
                                                    type="checkbox"
                                                    checked={rememberPassword}
                                                    onChange={(e) => setRememberPassword(e.target.checked)}
                                                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                                                />
                                                <Label htmlFor="remember" className="ml-2 text-sm text-theme-secondary">
                                                    Remember password
                                                </Label>
                                            </div>
                                            <a href="#" className="text-sm text-theme-primary hover:text-blue-500">
                                                Forgot password?
                                            </a>
                                        </div>

                                        <Button 
                                            className="w-full h-12 text-base font-semibold bg-theme-primary hover:bg-theme-primary-hover active:scale-[0.98] transition-all shadow-theme" 
                                            type="submit" 
                                            disabled={isLoading}
                                        >
                                            {isLoading ? "Signing In..." : "Sign In"}
                                        </Button>
                                    </form>
                                </CardContent>
                            </div>
                        </div>

                        {/* Right Section - Welcome Content */}
                        <div className="bg-gradient-theme p-8 lg:p-12 flex items-center justify-center transition-theme">
                            <div className="max-w-md text-center">
                                <h2 className="text-3xl font-bold text-theme">
                                    Welcome to Sevastu Backoffice
                                </h2>
                                 <p className="text-theme-secondary leading-relaxed mb-1 px-9 ">
                                    The mission control for your entire infrastructure. 
                                    Manage operartions, monitor performance and scale with precision.
                                    
                                </p>
                                <div className="mb-8">
                                    <img 
                                        src="https://images.unsplash.com/photo-1624377632657-3902bfd35958?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                        alt="Sevastu Dashboard" 
                                        className="w-84 h-60 mx-auto rounded-lg object-cover shadow-[10px_10px_25px_rgba(0,0,0,1)]"
                                    />
                                </div>
                                <p className="text-theme-secondary leading-relaxed">
                                        Your comprehensive admin dashboard for managing and monitoring all aspects of your Sevastu platform. Access powerful tools and insights in one centralized location.
                                </p>
                                <div className="mt-8 flex justify-center space-x-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-theme-primary">24/7</div>
                                        <div className="text-sm text-theme-secondary">Support</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-theme-primary">99.9%</div>
                                        <div className="text-sm text-theme-secondary">Uptime</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-theme-primary">Secure</div>
                                        <div className="text-sm text-theme-secondary">Platform</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <LoginFooter />
        </div>
    );
}
