
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const Tickets = () => {

    const { data: tickets, isLoading } = useQuery({
        queryKey: ['tickets-page'],
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
    });

    return (
        <Layout>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Support Tickets</h1>
                    <p className="text-muted-foreground">Get help with your website or hosting services.</p>
                </div>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Ticket
                </Button>
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center py-10">Loading...</div>
                ) : tickets && tickets.length > 0 ? (
                    tickets.map((ticket) => (
                        <Card key={ticket.id} className="hover:bg-accent/5 transition-colors cursor-pointer">
                            <CardContent className="p-6 flex items-center justify-between">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-3">
                                        <h3 className="font-semibold text-lg">{ticket.title}</h3>
                                        <Badge variant={
                                            ticket.status === 'open' ? 'default' :
                                                ticket.status === 'in_progress' ? 'secondary' : 'outline'
                                        }>
                                            {ticket.status.replace('_', ' ')}
                                        </Badge>
                                    </div>
                                    <p className="text-muted-foreground">{ticket.description}</p>
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    {new Date(ticket.created_at).toLocaleDateString()}
                                </div>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <div className="text-center py-12 border-2 border-dashed rounded-lg">
                        <h3 className="text-lg font-medium">No tickets yet</h3>
                        <p className="text-muted-foreground mb-4">You haven't created any support tickets.</p>
                        <Button>Create your first ticket</Button>
                    </div>
                )}
            </div>
        </Layout>
    );
};

export default Tickets;
