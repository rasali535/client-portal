
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Download, Trash2, Upload } from "lucide-react";

// Placeholder
const documents = [
    { id: 1, name: "Project_Proposal_v2.pdf", date: "2024-01-05", size: "2.4 MB", type: "PDF" },
    { id: 2, name: "Brand_Assets.zip", date: "2024-01-15", size: "15 MB", type: "Archive" },
    { id: 3, name: "Contract_Signed.pdf", date: "2024-01-02", size: "1.1 MB", type: "PDF" },
];

const Documents = () => {

    const handleUpload = () => {
        // Implement upload logic with Supabase Storage
        alert("Please configure Supabase Storage bucket 'files' to enable uploads.");
    }

    return (
        <Layout>
            <div className="flex justify-between items-end mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Documents & Files</h1>
                    <p className="text-muted-foreground">Shared files, assets, and contracts.</p>
                </div>
                <Button onClick={handleUpload}>
                    <Upload className="w-4 h-4 mr-2" />
                    Upload File
                </Button>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>File Manager</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[50px]"></TableHead>
                                <TableHead>Filename</TableHead>
                                <TableHead>Date Added</TableHead>
                                <TableHead>Size</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {documents.map((doc) => (
                                <TableRow key={doc.id}>
                                    <TableCell>
                                        <FileText className="w-5 h-5 text-blue-500" />
                                    </TableCell>
                                    <TableCell className="font-medium">{doc.name}</TableCell>
                                    <TableCell>{doc.date}</TableCell>
                                    <TableCell>{doc.size}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button variant="ghost" size="icon">
                                                <Download className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-600 hover:bg-red-50">
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </Layout>
    );
};

export default Documents;
