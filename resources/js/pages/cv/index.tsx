import { type CV } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Calendar, Clock } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import MarkdownContent from '@/components/markdown-content';
import { type BreadcrumbItem } from '@/types';

interface CVIndexProps {
    cvs: CV[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'CV & Resume',
        href: '/cv',
    },
];

export default function CVIndex({ cvs }: CVIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <div className="flex-1 p-8">
                <div className="max-w-6xl">
                    {/* Header */}
                    <div className="text-left mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <FileText className="h-12 w-12 text-destructive dark:text-destructive" />
                            <h1 className="text-5xl font-bold text-foreground dark:text-foreground">
                                CV & Resume
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl leading-relaxed">
                            My professional experience, skills, and qualifications
                        </p>
                    </div>

                    {/* CV Cards */}
                    {cvs && cvs.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {cvs.map((cv) => (
                                <Card key={cv.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)] hover:shadow-xl transition-all duration-300">
                                    <CardHeader className="pb-4">
                                        <div className="flex items-center justify-between mb-4">
                                            <CardTitle className="text-2xl font-bold text-foreground dark:text-foreground">
                                                {cv.title}
                                            </CardTitle>
                                            {cv.is_active && (
                                                <Badge className="bg-destructive text-destructive-foreground dark:bg-destructive">
                                                    Active
                                                </Badge>
                                            )}
                                        </div>
                                        
                                        <div className="flex items-center gap-4 text-sm text-muted-foreground dark:text-muted-foreground mb-4">
                                            <div className="flex items-center gap-1">
                                                <Calendar className="h-4 w-4" />
                                                <span>Created: {new Date(cv.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <Clock className="h-4 w-4" />
                                                <span>Updated: {new Date(cv.updated_at).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </CardHeader>
                                    
                                    <CardContent className="pb-6">
                                        {cv.markdown_content && (
                                            <div className="mb-6">
                                                <MarkdownContent content={cv.markdown_content} />
                                            </div>
                                        )}
                                        
                                        {cv.content && !cv.markdown_content && (
                                            <div className="mb-6">
                                                <MarkdownContent content={cv.content} />
                                            </div>
                                        )}
                                        
                                        {cv.file_path && (
                                            <div className="flex justify-center">
                                                <a
                                                    href={cv.file_path}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-2 px-4 py-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90 rounded-lg transition-colors"
                                                >
                                                    <Download className="h-4 w-4" />
                                                    Download CV
                                                </a>
                                            </div>
                                        )}
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <FileText className="h-16 w-16 text-muted-foreground dark:text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-2xl font-semibold text-foreground dark:text-foreground mb-2">
                                No CV information available
                            </h2>
                            <p className="text-muted-foreground dark:text-muted-foreground">
                                Check back soon for updated CV information!
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
