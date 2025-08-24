import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Eye, Folder, ExternalLink, Github } from 'lucide-react';
import { type Project } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface ProjectsIndexProps {
    projects: {
        items: Project[];
        currentPage: number;
        lastPage: number;
        perPage: number;
        total: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/admin/dashboard',
    },
    {
        title: 'Projects',
        href: '/admin/projects',
    },
];

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <Head title="Projects" />
            <div className="flex-1 p-8">
                <div className="max-w-7xl">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-foreground dark:text-foreground">
                            Projects
                        </h1>
                        <p className="text-muted-foreground dark:text-muted-foreground mt-2">
                            Manage your portfolio projects and showcase your work.
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="mb-6">
                        <Button asChild className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90">
                            <Link href={route('admin.projects.create')}>
                                <Plus className="mr-2 h-4 w-4" />
                                New Project
                            </Link>
                        </Button>
                    </div>

                    {/* Projects List */}
                    <div className="grid gap-6">
                        {projects.items.length === 0 ? (
                            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                <CardContent className="p-8 text-center">
                                    <div className="mx-auto w-16 h-16 bg-destructive/10 dark:bg-destructive/10 rounded-full flex items-center justify-center mb-4">
                                        <Folder className="h-8 w-8 text-destructive dark:text-destructive" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-foreground dark:text-foreground mb-2">
                                        No projects yet
                                    </h3>
                                    <p className="text-muted-foreground dark:text-muted-foreground mb-4">
                                        Get started by adding your first project to showcase your skills.
                                    </p>
                                    <Button asChild className="bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90">
                                        <Link href={route('admin.projects.create')}>
                                            <Plus className="mr-2 h-4 w-4" />
                                            Add First Project
                                        </Link>
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            projects.items.map((project) => (
                                <Card key={project.id} className="border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)]">
                                    <CardHeader>
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <div className="flex items-center gap-2 mb-2">
                                                    <CardTitle className="text-xl font-semibold text-foreground dark:text-foreground">
                                                        {project.title}
                                                    </CardTitle>
                                                    {project.is_featured && (
                                                        <Badge className="bg-destructive text-destructive-foreground dark:bg-destructive">
                                                            Featured
                                                        </Badge>
                                                    )}
                                                </div>
                                                <CardDescription className="text-muted-foreground dark:text-muted-foreground mb-3">
                                                    {project.description}
                                                </CardDescription>
                                                {project.technologies && project.technologies.length > 0 && (
                                                    <div className="flex flex-wrap gap-2">
                                                        {project.technologies.map((tech, index) => (
                                                            <Badge key={index} variant="secondary" className="text-xs">
                                                                {tech}
                                                            </Badge>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex items-center gap-2 ml-4">
                                                {project.live_url && (
                                                    <Button asChild variant="ghost" size="sm">
                                                        <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                )}
                                                {project.github_url && (
                                                    <Button asChild variant="ghost" size="sm">
                                                        <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                                            <Github className="h-4 w-4" />
                                                        </a>
                                                    </Button>
                                                )}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm text-muted-foreground dark:text-muted-foreground">
                                                Sort Order: {project.sort_order || 0}
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('admin.projects.edit', project.id)}>
                                                        <Edit className="h-4 w-4" />
                                                        Edit
                                                    </Link>
                                                </Button>
                                                <Button asChild variant="outline" size="sm">
                                                    <Link href={route('admin.projects.show', project.id)}>
                                                        <Eye className="h-4 w-4" />
                                                        View
                                                    </Link>
                                                </Button>
                                                <Button variant="outline" size="sm" className="text-destructive hover:text-destructive/90 hover:bg-destructive/10 dark:text-destructive dark:hover:text-destructive/90 dark:hover:bg-destructive/20">
                                                    <Trash2 className="h-4 w-4" />
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </div>

                    {/* Pagination */}
                    {projects.lastPage > 1 && (
                        <div className="mt-8 flex items-center justify-center">
                            <div className="flex items-center gap-2">
                                {Array.from({ length: projects.lastPage }, (_, i) => i + 1).map((page) => (
                                    <Button
                                        key={page}
                                        variant={page === projects.currentPage ? "default" : "outline"}
                                        size="sm"
                                        className={page === projects.currentPage 
                                                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
                                                : "border-border text-foreground hover:border-destructive dark:border-border dark:text-foreground dark:hover:border-destructive"
                                            }
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
