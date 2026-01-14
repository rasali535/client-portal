
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Server, RefreshCw } from "lucide-react";

// Placeholder data - replace with Supabase data later
const projects = [
    {
        id: 1,
        name: "E-Commerce Store Redesign",
        url: "https://shop.example.com",
        status: "active",
        type: "Development",
        hosting_renewal: "2024-12-01",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80"
    },
    {
        id: 2,
        name: "Corporate Landing Page",
        url: "https://example.com",
        status: "maintenance",
        type: "Maintenance",
        hosting_renewal: "2024-10-15",
        image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&q=80"
    }
];

const Projects = () => {
    return (
        <Layout>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Projects & Hosting</h1>
                    <p className="text-muted-foreground">Manage your active websites and hosting plans.</p>
                </div>
                <Button>Request New Project</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden group">
                        <div className="aspect-video relative overflow-hidden bg-muted">
                            <img
                                src={project.image}
                                alt={project.name}
                                className="object-cover w-full h-full transition-transform group-hover:scale-105"
                            />
                            <div className="absolute top-2 right-2">
                                <Badge variant={project.status === 'active' ? 'default' : 'secondary'}>
                                    {project.status === 'active' ? 'Active Dev' : 'Maintenance'}
                                </Badge>
                            </div>
                        </div>
                        <CardHeader className="pb-2">
                            <CardTitle className="flex justify-between items-start text-xl">
                                {project.name}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center text-sm text-muted-foreground gap-2">
                                <Globe className="w-4 h-4" />
                                <a href={project.url} target="_blank" rel="noreferrer" className="hover:underline flex items-center gap-1">
                                    {project.url.replace('https://', '')}
                                    <ExternalLink className="w-3 h-3" />
                                </a>
                            </div>

                            <div className="p-3 bg-secondary/50 rounded-lg space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="flex items-center gap-2"><Server className="w-4 h-4" /> Hosting Renewal</span>
                                    <span className="font-medium">{project.hosting_renewal}</span>
                                </div>
                                <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 w-3/4" />
                                </div>
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Standard Plan</span>
                                    <span className="text-green-600 font-medium">Active</span>
                                </div>
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button variant="outline" className="w-full flex-1">
                                    <RefreshCw className="w-4 h-4 mr-2" />
                                    Details
                                </Button>
                                <Button variant="outline" className="w-full flex-1">Managers</Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </Layout>
    );
};

// Missing imports fix
import { Globe } from "lucide-react";

export default Projects;
