
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/components/AuthProvider";
import { toast } from "sonner";
import { AlertTriangle, Globe } from "lucide-react";

// Domains managed by the Maplin team
const MANAGED_DOMAINS = [
    "www.eagletouchtours.com",
    "www.pameltex.com",
    "www.thesafaributler.com",
    "www.bbtraveltours.com",
    "www.lebvilleboutique.com",
    "www.peregrinetoursandsafaris.com",
    "www.themaplin.com"
];

const Index = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [domain, setDomain] = useState("");
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();
    const { session } = useAuth();

    // Check if Supabase is configured
    const isSupabaseConfigured = import.meta.env.VITE_SUPABASE_URL &&
        import.meta.env.VITE_SUPABASE_URL !== "YOUR_SUPABASE_URL" &&
        import.meta.env.VITE_SUPABASE_URL.startsWith("http") &&
        import.meta.env.VITE_SUPABASE_ANON_KEY &&
        import.meta.env.VITE_SUPABASE_ANON_KEY !== "YOUR_SUPABASE_ANON_KEY";

    useEffect(() => {
        if (session) {
            navigate("/dashboard");
        }
    }, [session, navigate]);

    const handleAuth = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isLogin) {
                const { error } = await supabase.auth.signInWithPassword({
                    email,
                    password,
                });
                if (error) throw error;
                toast.success("Welcome back!");
                navigate("/dashboard");
            } else {
                // Validation: Ensure a domain is selected
                if (!domain) {
                    toast.error("Please select your domain to continue.");
                    setLoading(false);
                    return;
                }

                const { error } = await supabase.auth.signUp({
                    email,
                    password,
                    options: {
                        data: {
                            website_domain: domain,
                        },
                    },
                });
                if (error) throw error;
                toast.success("Account created! Please check your email.");
            }
        } catch (error: any) {
            console.error("Auth error:", error);
            toast.error(error.message || "An error occurred during authentication");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
            {!isSupabaseConfigured && (
                <div className="mb-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg max-w-md flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                    <div>
                        <h3 className="font-semibold text-yellow-900">Connection Not Configured</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                            The application is not connected to Supabase.
                        </p>
                        <p className="text-sm text-yellow-700 mt-2">
                            <strong>Local Development:</strong> Update your <code className="bg-yellow-100 px-1 rounded">.env</code> file.
                        </p>
                        <p className="text-sm text-yellow-700 mt-1">
                            <strong>Production (Hostinger):</strong> You must <b>re-run the build</b> ("npm run build") after creating your .env file locally, and then re-upload the `dist` folder. Environment variables are baked in during the build.
                        </p>
                    </div>
                </div>
            )}

            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle className="text-2xl text-center">Client Portal</CardTitle>
                    <CardDescription className="text-center">
                        {isLogin ? "Sign in to manage your website" : "Register your managed domain"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleAuth} className="space-y-4">
                        {!isLogin && (
                            <div className="space-y-2">
                                <Label htmlFor="domain">Select Your Website</Label>
                                <Select value={domain} onValueChange={setDomain}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Select your domain" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {MANAGED_DOMAINS.map((d) => (
                                                <SelectItem key={d} value={d}>
                                                    {d}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                <p className="text-xs text-muted-foreground">
                                    Choose the website receiving maintainance services.
                                </p>
                            </div>
                        )}

                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder={domain ? `info@${domain.replace('www.', '')}` : "user@company.com"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" disabled={loading || !isSupabaseConfigured}>
                            {loading ? "Loading..." : (isLogin ? "Sign In" : "Create Account")}
                        </Button>

                        <div className="text-center text-sm">
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="text-primary hover:underline"
                            >
                                {isLogin ? "Need an account? Sign Up" : "Already have an account? Sign In"}
                            </button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default Index;
