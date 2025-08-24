import { type Project } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FolderOpen, ExternalLink, Github, ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Head, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import MarkdownContent from '@/components/markdown-content';

interface ProjectShowProps {
    project: Project;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Projects',
        href: '/projects',
    },
    {
        title: 'Project Details',
        href: '#',
    },
];

export default function ProjectShow({ project }: ProjectShowProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <Head title={project.title} />
            <div className="flex-1 p-8">
                <div className="max-w-4xl">
                    {/* Back Button */}
                    <div className="mb-8">
                        <Button asChild variant="ghost" className="text-muted-foreground dark:text-muted-foreground hover:text-foreground dark:hover:text-foreground">
                            <Link href={route('projects.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to Projects
                            </Link>
                        </Button>
                    </div>

                    {/* Project Header */}
                    <div className="mb-12">
                        <div className="flex items-center gap-3 mb-6">
                            <FolderOpen className="h-8 w-8 text-destructive dark:text-destructive" />
                            <h1 className="text-4xl font-bold text-foreground dark:text-foreground">
                                {project.title}
                            </h1>
                            {project.is_featured && (
                                <Badge className="bg-destructive text-destructive-foreground dark:bg-destructive text-sm px-3 py-1">
                                    Featured
                                </Badge>
                            )}
                        </div>
                        
                        <div className="text-xl text-muted-foreground dark:text-muted-foreground leading-relaxed max-w-3xl">
                            <MarkdownContent content={project.markdown_content || project.description} />
                        </div>
                    </div>

                    {/* Project Image */}
                    {project.image && (
                        <div className="mb-12">
                            <div className="rounded-xl overflow-hidden shadow-2xl">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-96 object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Project Details */}
                    <div className="grid gap-8 md:grid-cols-3 mb-12">
                        {/* Main Content */}
                        <div className="md:col-span-2 space-y-8">
                            {/* Description */}
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardHeader>
                                    <CardTitle className="text-2xl font-bold text-foreground dark:text-foreground">
                                        About This Project
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-lg text-muted-foreground dark:text-muted-foreground leading-relaxed">
                                        <MarkdownContent content={project.markdown_content || project.description} />
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Technologies */}
                            {project.technologies && project.technologies.length > 0 && (
                                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                    <CardHeader>
                                        <CardTitle className="text-2xl font-bold text-foreground dark:text-foreground">
                                            Technologies Used
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex flex-wrap gap-3">
                                            {project.technologies.map((tech, index) => (
                                                <Badge key={index} variant="secondary" className="text-sm px-4 py-2 bg-accent dark:bg-accent border border-border dark:border-border">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </CardContent>
                                </Card>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Project Links */}
                            {(project.live_url || project.github_url) && (
                                <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                    <CardHeader>
                                        <CardTitle className="text-xl font-bold text-foreground dark:text-foreground">
                                            Project Links
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="space-y-3">
                                        {project.live_url && (
                                            <Button asChild className="w-full bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90">
                                                <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="mr-2 h-4 w-4" />
                                                    Live Demo
                                                </a>
                                            </Button>
                                        )}
                                        {project.github_url && (
                                            <Button asChild variant="outline" className="w-full border-border text-foreground hover:border-destructive dark:border-border dark:text-foreground dark:hover:border-destructive">
                                                <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                                    <Github className="mr-2 h-4 w-4" />
                                                    View Code
                                                </a>
                                            </Button>
                                        )}
                                    </CardContent>
                                </Card>
                            )}

                            {/* Project Info */}
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-foreground dark:text-foreground">
                                        Project Info
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground dark:text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        <span>Created: {new Date(project.created_at).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground dark:text-muted-foreground">
                                        <Clock className="h-4 w-4" />
                                        <span>Updated: {new Date(project.updated_at).toLocaleDateString()}</span>
                                    </div>
                                    {project.sort_order !== undefined && (
                                        <div className="flex items-center gap-3 text-sm text-muted-foreground dark:text-muted-foreground">
                                            <FolderOpen className="h-4 w-4" />
                                            <span>Priority: {project.sort_order}</span>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Back to Projects */}
                    <div className="text-center">
                        <Button asChild variant="outline" size="lg" className="border-border text-foreground hover:border-destructive dark:border-border dark:text-foreground dark:hover:border-destructive">
                            <Link href={route('projects.index')}>
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Back to All Projects
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
