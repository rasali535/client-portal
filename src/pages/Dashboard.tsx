
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ticket, CreditCard, LayoutDashboard, Plus, Globe, Activity, TrendingUp, AlertCircle, CheckCircle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { fetchPageSpeedData } from "@/services/pageSpeed";

const Dashboard = () => {
    const { session, user, signOut } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!session) {
            navigate("/");
        }
    }, [session, navigate]);

    const { data: profile } = useQuery({
        queryKey: ['profile'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', session?.user.id)
                .single();
            if (error) return null;
            return data;
        },
        enabled: !!session,
    });

    const { data: tickets, isLoading: loadingTickets } = useQuery({
        queryKey: ['tickets'],
        queryFn: async () => {
            const { data, error } = await supabase
                .from('tickets')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) {
                toast.error('Failed to fetch tickets');
                throw error;
            }
            return data;
        },
        enabled: !!session,
    });

    // Use domain from profile or fallback to metadata
    const userDomain = profile?.website_domain || user?.user_metadata?.website_domain || "example.com";

    // Fetch Real SEO Data
    const { data: seoData, isLoading: loadingSeo } = useQuery({
        queryKey: ['seo', userDomain],
        queryFn: () => fetchPageSpeedData(userDomain),
        enabled: !!userDomain && userDomain !== "example.com",
        retry: 1, // Don't retry too much if API fails
    });

    const createTicket = async () => {
        toast("Create Ticket clicked - Implement form dialog here");
    }

    if (!session) return null;

    return (
        <Layout>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
                    <div className="flex items-center gap-2 text-muted-foreground mt-1">
                        <Globe className="w-4 h-4" />
                        <span>{userDomain}</span>
                        <Badge variant="outline" className="ml-2 bg-green-50 text-green-700 border-green-200">Online</Badge>
                    </div>
                </div>
                <Button onClick={createTicket}>
                    <Plus className="w-4 h-4 mr-2" />
                    New Ticket
                </Button>
            </div>

            {/* Website Health & SEO Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Website Performance</CardTitle>
                        <Activity className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        {loadingSeo ? (
                            <div className="animate-pulse space-y-2">
                                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            </div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold text-green-600">
                                    {seoData?.performanceScore || 'N/A'}%
                                </div>
                                <p className="text-xs text-muted-foreground">Mobile performance score (Google)</p>
                                <div className="mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 ${(seoData?.performanceScore || 0) >= 90 ? 'bg-green-500' :
                                                (seoData?.performanceScore || 0) >= 50 ? 'bg-yellow-500' : 'bg-red-500'
                                            }`}
                                        style={{ width: `${seoData?.performanceScore || 0}%` }}
                                    ></div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white to-gray-50">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">SEO Health Score</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        {loadingSeo ? (
                            <div className="animate-pulse space-y-2">
                                <div className="h-8 w-16 bg-gray-200 rounded"></div>
                                <div className="h-4 w-32 bg-gray-200 rounded"></div>
                            </div>
                        ) : (
                            <>
                                <div className="text-2xl font-bold text-blue-600">
                                    {seoData?.seoScore || 'N/A'}
                                </div>
                                <p className="text-xs text-muted-foreground">
                                    Technical SEO audit score (Lighthouse)
                                </p>
                                <div className="mt-3 h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full transition-all duration-1000 bg-blue-500`}
                                        style={{ width: `${seoData?.seoScore || 0}%` }}
                                    ></div>
                                </div>
                            </>
                        )}
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Support</CardTitle>
                        <Ticket className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{tickets?.filter(t => t.status === 'open').length || 0}</div>
                        <p className="text-xs text-muted-foreground">Open tickets requiring attention</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-1 md:col-span-4 transition-all">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loadingTickets ? (
                            <div className="text-center py-8 text-muted-foreground">Loading tickets...</div>
                        ) : tickets && tickets.length > 0 ? (
                            <div className="space-y-4">
                                {tickets.slice(0, 5).map(ticket => (
                                    <div key={ticket.id} className="flex items-center justify-between p-4 border rounded-lg bg-card hover:bg-accent/50 transition-colors">
                                        <div className="space-y-1">
                                            <p className="font-medium leading-none">{ticket.title}</p>
                                            <p className="text-sm text-muted-foreground line-clamp-1">{ticket.description}</p>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className={`px-2 py-1 rounded-full text-xs font-semibold ${ticket.status === 'open' ? 'bg-green-100 text-green-700' :
                                                    ticket.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                                                        'bg-gray-100 text-gray-700'
                                                }`}>
                                                {ticket.status.replace('_', ' ')}
                                            </div>
                                            <div className="text-sm text-muted-foreground">
                                                {new Date(ticket.created_at).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-[200px] text-muted-foreground border-2 border-dashed rounded-md bg-muted/50">
                                <CheckCircle className="w-8 h-8 mb-2 opacity-50 text-green-500" />
                                <p>No issues reported</p>
                                <Button variant="link" onClick={createTicket}>Report an issue</Button>
                            </div>
                        )}
                    </CardContent>
                </Card>

                <Card className="col-span-1 md:col-span-3">
                    <CardHeader>
                        <CardTitle>Hosting Status</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="p-4 border rounded-lg bg-slate-50">
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <Globe className="w-4 h-4 text-slate-500" />
                                    <span className="font-medium truncate max-w-[150px]" title={userDomain}>
                                        {userDomain}
                                    </span>
                                </div>
                                <Badge>Active</Badge>
                            </div>
                            <div className="space-y-1 text-sm text-muted-foreground">
                                <div className="flex justify-between">
                                    <span>Plan:</span>
                                    <span>Business Pro</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Renewal:</span>
                                    <span>Dec 15, 2026</span>
                                </div>
                            </div>
                        </div>

                        <Button className="w-full justify-start" variant="outline" onClick={() => navigate('/invoices')}>
                            <CreditCard className="w-4 h-4 mr-2" />
                            View Billing
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </Layout>
    );
};

export default Dashboard;
