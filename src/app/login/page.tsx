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
        <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
            {/* Navbar */}
            <LoginNavbar />

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center px-6 py-12">
                <div className="w-full max-w-6xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
                    <div className="grid md:grid-cols-2">
                        {/* Left Section - Login Form */}
                        <div className="p-8 lg:p-12">
                            <div className="max-w-sm mx-auto">
                                <CardHeader className="space-y-1 p-0 mb-8">
                                    <div className="w-12 h-12 bg-blue-600 rounded-xl mb-4 flex items-center justify-center shadow-lg">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                        Sign In
                                    </CardTitle>
                                    <CardDescription className="text-gray-600 dark:text-gray-400">
                                        Enter your credentials to access the admin dashboard
                                    </CardDescription>
                                </CardHeader>

                                <CardContent className="p-0">
                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="space-y-2">
                                            <Label htmlFor="email" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                EMAIL ADDRESS
                                            </Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="admin@sevastu.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                PASSWORD
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="h-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white transition-all"
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
                                                <Label htmlFor="remember" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                                    Remember password
                                                </Label>
                                            </div>
                                            <a href="#" className="text-sm text-blue-600 hover:text-blue-500 dark:text-blue-400">
                                                Forgot password?
                                            </a>
                                        </div>

                                        <Button 
                                            className="w-full h-12 text-base font-semibold bg-blue-600 hover:bg-blue-700 active:scale-[0.98] transition-all shadow-md" 
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
                        <div className="bg-gradient-to-br from-teal-50 to-blue-50 dark:from-teal-900/20 dark:to-blue-900/20 p-8 lg:p-12 flex items-center justify-center">
                            <div className="max-w-md text-center">
                                <div className="mb-8">
                                    <img 
                                        src="/api/placeholder/300/200" 
                                        alt="Sevastu Dashboard" 
                                        className="w-64 h-40 mx-auto rounded-lg shadow-lg object-cover"
                                    />
                                </div>
                                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                                    Welcome to Sevastu Backoffice
                                </h2>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    Your comprehensive admin dashboard for managing and monitoring all aspects of your Sevastu platform. Access powerful tools and insights in one centralized location.
                                </p>
                                <div className="mt-8 flex justify-center space-x-8">
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">24/7</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Support</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">99.9%</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Uptime</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">Secure</div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">Platform</div>
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
