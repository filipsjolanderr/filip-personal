import { type Project } from '@/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FolderOpen } from 'lucide-react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import MarkdownContent from '@/components/markdown-content';
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
        title: 'Projects',
        href: '/projects',
    },
];

export default function ProjectsIndex({ projects }: ProjectsIndexProps) {
    const pages = [];
    for (let i = 1; i <= projects.lastPage; i++) {
        pages.push(i);
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs} variant="sidebar">
            <div className="flex-1 p-8">
                <div className="max-w-7xl">
                    {/* Header */}
                    <div className="text-left mb-16">
                        <div className="inline-flex items-center gap-3 mb-6">
                            <FolderOpen className="h-12 w-12 text-destructive dark:text-destructive" />
                            <h1 className="text-5xl font-bold text-foreground dark:text-foreground">
                                Projects
                            </h1>
                        </div>
                        <p className="text-xl text-muted-foreground dark:text-muted-foreground max-w-3xl leading-relaxed">
                            A collection of my work, showcasing various technologies and problem-solving approaches
                        </p>
                    </div>

                    {/* Projects Grid */}
                    {projects && projects.items && projects.items.length > 0 ? (
                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-16">
                            {projects.items.map((project) => (
                                <Link key={project.id} href={route('projects.show', project.id)} className="block">
                                    <Card className="group border-0 shadow-lg bg-white/80 backdrop-blur-sm dark:bg-background/80 dark:shadow-[inset_0px_0px_0px_1px_rgba(255,250,237,0.18)] hover:shadow-xl transition-all duration-300 cursor-pointer">
                                        {project.image && (
                                            <div className="overflow-hidden rounded-t-lg">
                                                <img
                                                    src={project.image}
                                                    alt={project.title}
                                                    className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                        )}
                                        <CardHeader className="pb-4">
                                            <div className="flex items-center gap-2 mb-3">
                                                {project.is_featured && (
                                                    <Badge className="bg-destructive text-destructive-foreground dark:bg-destructive">
                                                        Featured
                                                    </Badge>
                                                )}
                                            </div>
                                            <CardTitle className="text-xl font-bold text-foreground dark:text-foreground group-hover:text-destructive dark:group-hover:text-destructive transition-colors line-clamp-2">
                                                {project.title}
                                            </CardTitle>
                                        </CardHeader>
                                        <CardContent className="pb-6">
                                            <div className="text-muted-foreground dark:text-muted-foreground line-clamp-3 text-base leading-relaxed mb-4">
                                                <MarkdownContent content={project.markdown_content || project.description} />
                                            </div>
                                            {project.technologies && project.technologies.length > 0 && (
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map((tech, index) => (
                                                        <Badge key={index} variant="secondary" className="text-xs">
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                </div>
                                            )}
                                        </CardContent>
                                    </Card>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <FolderOpen className="h-16 w-16 text-muted-foreground dark:text-muted-foreground mx-auto mb-4" />
                            <h2 className="text-2xl font-semibold text-foreground dark:text-foreground mb-2">
                                No projects available
                            </h2>
                            <p className="text-muted-foreground dark:text-muted-foreground">
                                Check back soon for new projects!
                            </p>
                        </div>
                    )}

                    {/* Pagination */}
                    {projects && projects.lastPage > 1 && (
                        <div className="flex justify-center items-center gap-2">
                            {pages.map((page) => (
                                <div
                                    key={page}
                                    className={`px-4 py-2 rounded-md text-sm font-medium cursor-pointer transition-colors ${
                                        page === projects.currentPage 
                                            ? "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:hover:bg-destructive/90"
                                            : "border border-border text-foreground hover:border-destructive dark:border-border dark:text-foreground dark:hover:border-destructive hover:bg-accent dark:hover:bg-accent"
                                    }`}
                                >
                                    {page}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
