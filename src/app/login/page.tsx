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
import logo from "@/assets/logo5.png";

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
            {/* <LoginNavbar /> */}

            {/* Main Content */}
            <div className="flex-1 flex items-center justify-center sm:py-0 lg:py-0 bg-theme-bg">
                <div className="h-full max-h-screen overflow-hidden transition-theme">
                    <div className="grid md:grid-cols-1 lg:grid-cols-2">
                        {/* Left Section - Login Form */}
                        <div className="flex items-center justify-center">
                            <div className="flex items-center lg:w-100 sm:w-100">
                                <div className="w-full max-w-md mx-auto">
                                    <CardHeader className="space-y-0 p-2 mb-4">
                                        <img src={logo.src} alt="Sevastu" className="w-20 h-20 mx-auto mb-[-4]" />
                                        <CardTitle className="text-2xl sm:text-3xl font-bold text-theme-primary text-center">
                                            {/* Login Into Administrative Dashboard */}
                                            Sevastu
                                        </CardTitle>
                                        <CardDescription className="text-theme-secondary text-xs text-center">
                                            Enter your credentials to access the admin dashboard
                                        </CardDescription>
                                    </CardHeader>

                                    <CardContent className="p-4 border-t-4 border-primary rounded-xl ">
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
                        </div>

                        {/* Right Section - Welcome Content */}
                        <div className="hidden lg:flex items-center justify-center bg-gradient-theme p-0 sm:p-0 lg:p-0">
                            <div className="relative">
                                <img 
                                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAmscXJPDSJcaM1n7wty3t4ZYR8ESRFLQAiJQ2QTPxqKnW-RScq56xrihNt5GRRQbQJRm-9SD3A8JuqjJlTDYOtNsHj8BE_8bsQxxdYJ4BXCS0WY_Aw8vUMidoAgodSg-YbGrhNtf6oKIme__5d16yq6tv0t5Ub9h2tx9GhfqvUmyzdWX9mGHhUFCDD4X3IQdPBQjfr0Mw-ffIZSOFA0gwFglcnRRyVblAMlPkK7lR0uCs7pGgL7l5C4xGVCPphfzOXMlkRLEW8pAyQ" 
                                    alt="Sevastu Dashboard" 
                                    className="h-full sm:h-112 lg:h-180 lg:w-180 object-cover opacity-75 overflow-hidden saturate-120"
                                />
                                <div className="absolute inset-0 px-10 sm:px-10 lg:px-20 flex flex-col justify-end mb-8 sm:mb-15">
                                    <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                                        Connecting <span className="text-white">Skills</span> with needs, everywhere.
                                    </h2>
                                    
                                    <p className="text-white/80 text-sm sm:text-base leading-relaxed mb-4">
                                        Empowering service provider and customers through a seamless, trusted platform designed for community growth.
                                    </p>
                                    <div className="flex justify-start space-x-4 sm:space-x-6 lg:space-x-8">
                                        <div className="text-center">
                                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary/70">24/7</div>
                                            <div className="text-xs sm:text-sm text-white/80">Support</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary/70">99.9%</div>
                                            <div className="text-xs sm:text-sm text-white/80">Uptime</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-primary/70">Secure</div>
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
