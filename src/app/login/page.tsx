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
            <div className="flex-1 flex items-center justify-center py-4 sm:py-6 lg:py-8 bg-theme-bg px-4">
                <div className="w-full max-w-5xl bg-theme-card rounded-sm shadow-theme-sm overflow-hidden transition-theme">
                    <div className="grid md:grid-cols-1 lg:grid-cols-2 min-h-[600px]">
                        {/* Left Section - Login Form */}
                        <div className="px-4 sm:px-8 lg:px-12 py-8 sm:py-12 lg:py-16 flex items-center">
                            <div className="w-full max-w-md mx-auto">
                                <CardHeader className="space-y-1 p-0 mb-8">
                
                                    <CardTitle className="text-2xl sm:text-3xl font-bold text-theme-primary">
                                        Login Into Administrative Dashboard
                                    </CardTitle>
                                    <CardDescription className="text-theme-secondary font-heading text-sm sm:text-base">
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
                                                autoComplete="email"
                                                // placeholder="admin@test.com"
                                                placeholder="admin@sevastu.com"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                                className="h-10 border border-theme-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-theme transition-all"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <Label htmlFor="password" className="text-sm font-semibold text-theme-secondary">
                                                PASSWORD
                                            </Label>
                                            <Input
                                                id="password"
                                                type="password"
                                                autoComplete="current-password"
                                                placeholder="••••••••"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                                className="h-10 border border-theme-border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 input-theme transition-all"
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
                        <div className="hidden lg:flex items-center justify-center bg-gradient-theme p-0 sm:p-0 lg:p-0">
                            <div className="relative w-full max-w-lg">
                                <img 
                                    src="https://plus.unsplash.com/premium_photo-1661778564677-e2f4ab3c2a3b?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                                    alt="Sevastu Dashboard" 
                                    className="w-full h-96 sm:h-112 lg:h-150 object-cover opacity-75"
                                />
                                <div className="absolute inset-0 px-4 sm:px-6 lg:px-8 flex flex-col justify-end mb-4 sm:mb-6">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                                        Connecting <span className="text-white">Skills</span> with needs, everywhere.
                                    </h2>
                                    
                                    <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
                                        Empowering service provider and customers through a seamless, trusted platform designed for community growth.
                                    </p>
                                    <div className="flex justify-start space-x-4 sm:space-x-6 lg:space-x-8">
                                        <div className="text-center">
                                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary/100">24/7</div>
                                            <div className="text-xs sm:text-sm text-white/80">Support</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary/100">99.9%</div>
                                            <div className="text-xs sm:text-sm text-white/80">Uptime</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary/100">Secure</div>
                                            <div className="text-xs sm:text-sm text-white/80">Platform</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* </div> */}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <LoginFooter />
        </div>
    );
}
