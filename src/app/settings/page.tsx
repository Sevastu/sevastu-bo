"use client";

import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { apiClient } from "@/lib/apiClient";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";
import { ShieldCheck, CheckCircle2, Palette, Moon, Sun, RotateCcw, Save } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeProvider";
import { ColorPicker } from "@/components/ui/color-picker";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'security' | 'appearance'>('security');
    const { theme, updateTheme, resetTheme, isDark, toggleDark } = useTheme();

    // Security State
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setStatus({ type: 'error', message: "Passwords do not match" });
            return;
        }
        if (password.length < 6) {
            setStatus({ type: 'error', message: "Password must be at least 6 characters long" });
            return;
        }

        setIsLoading(true);
        setStatus(null);
        try {
            await apiClient.post('/auth/set-password', { password });
            setStatus({ type: 'success', message: "Password updated successfully!" });
            setPassword("");
            setConfirmPassword("");
        } catch (err: any) {
            setStatus({ type: 'error', message: err?.response?.data?.message || "Failed to update password." });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AppLayout>
            <div className="max-w-4xl mx-auto space-y-6">
                <div className="flex flex-col gap-2">
                    <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                    <p className="text-muted-foreground">Manage your account security and dashboard appearance.</p>
                </div>

                <div className="flex space-x-1 bg-muted p-1 rounded-xl w-fit">
                    <button
                        onClick={() => setActiveTab('security')}
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                            activeTab === 'security' 
                                ? "bg-card text-primary shadow-sm" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Security
                    </button>
                    <button
                        onClick={() => setActiveTab('appearance')}
                        className={cn(
                            "px-4 py-2 text-sm font-medium rounded-lg transition-all",
                            activeTab === 'appearance' 
                                ? "bg-card text-primary shadow-sm" 
                                : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        Appearance
                    </button>
                </div>

                {activeTab === 'security' && (
                    <Card className="max-w-2xl border-none shadow-md">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <ShieldCheck className="w-5 h-5 text-primary" />
                                Security
                            </CardTitle>
                            <CardDescription>Update your password to keep your account secure.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleUpdatePassword} className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="new-password">New Password</Label>
                                    <Input
                                        id="new-password"
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                                    <Input
                                        id="confirm-password"
                                        type="password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>

                                {status && (
                                    <Alert variant={status.type === 'success' ? 'default' : 'destructive'} className={cn(status.type === 'success' && "border-green-200 bg-green-50/50 text-green-800")}>
                                        <div className="flex items-center gap-2">
                                            {status.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : null}
                                            <AlertTitle>{status.type === 'success' ? 'Success' : 'Error'}</AlertTitle>
                                        </div>
                                        <AlertDescription>{status.message}</AlertDescription>
                                    </Alert>
                                )}

                                <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
                                    {isLoading ? "Updating..." : "Update Password"}
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                )}

                {activeTab === 'appearance' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="border-none shadow-md md:col-span-2">
                            <CardHeader className="flex flex-row items-center justify-between">
                                <div className="space-y-1">
                                    <CardTitle className="flex items-center gap-2">
                                        <Palette className="w-5 h-5 text-primary" />
                                        Custom Theme
                                    </CardTitle>
                                    <CardDescription>Personalize the admin interface colors.</CardDescription>
                                </div>
                                <div className="flex gap-2">
                                    <Button variant="outline" size="sm" onClick={resetTheme} className="gap-2">
                                        <RotateCcw className="w-4 h-4" />
                                        Reset
                                    </Button>
                                    <Button variant="outline" size="sm" onClick={toggleDark} className="gap-2">
                                        {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                                        {isDark ? "Light Mode" : "Dark Mode"}
                                    </Button>
                                </div>
                            </CardHeader>
                            <Separator className="mb-4" />
                            <CardContent className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Core Colors</h4>
                                    <ColorPicker 
                                        label="Primary Color" 
                                        value={theme.primaryColor} 
                                        onChange={(val) => updateTheme({ primaryColor: val })} 
                                    />
                                    <ColorPicker 
                                        label="Background Color" 
                                        value={theme.backgroundColor} 
                                        onChange={(val) => updateTheme({ backgroundColor: val })} 
                                    />
                                    <ColorPicker 
                                        label="Card Color" 
                                        value={theme.cardColor} 
                                        onChange={(val) => updateTheme({ cardColor: val })} 
                                    />
                                    <ColorPicker 
                                        label="Text Color" 
                                        value={theme.textColor} 
                                        onChange={(val) => updateTheme({ textColor: val })} 
                                    />
                                    <ColorPicker 
                                        label="Border Color" 
                                        value={theme.borderColor} 
                                        onChange={(val) => updateTheme({ borderColor: val })} 
                                    />
                                </div>
                                <div className="space-y-4">
                                    <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Status Colors</h4>
                                    <ColorPicker 
                                        label="Success Color" 
                                        value={theme.successColor} 
                                        onChange={(val) => updateTheme({ successColor: val })} 
                                    />
                                    <ColorPicker 
                                        label="Warning Color" 
                                        value={theme.warningColor} 
                                        onChange={(val) => updateTheme({ warningColor: val })} 
                                    />
                                    <ColorPicker 
                                        label="Error Color" 
                                        value={theme.errorColor} 
                                        onChange={(val) => updateTheme({ errorColor: val })} 
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="bg-muted/30 border-t mt-4 py-4">
                                <p className="text-xs text-muted-foreground italic">
                                    Changes are applied instantly and saved to your browser session.
                                </p>
                            </CardFooter>
                        </Card>
                    </div>
                )}
            </div>
        </AppLayout>
    );
}

function Separator({ className }: { className?: string }) {
    return <div className={cn("h-px bg-border", className)} />;
}
